import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/db.js";

export const createUser = async (name, email) => {
    const [exist] = await sequelize.query(`select id from users where email = ?`, {replacements: [email]});
    if (exist.length) throw new Error("Email already exist");
    const [result] = await sequelize.query(`insert into users (name, email) values (?,?)`, {replacements: [name, email]});
    const userId = result.insertId;
    await sequelize.query('insert into wallets (user_id) values (?)', {replacements: [userId]});
    return {id: userId, name, email}
};

export const addBalance = async (userId, amount) => {
    if (amount == 0) throw new Error("Invalid amount");
    await sequelize.query('update wallets set balance = balance + ? where user_id = ?', {replacements: [amount, userId]});
    return {message:'balance added successfully'};
};

export const transferMoney = async (fromUserId, toUserId, amount) => {
    if (amount <= 0) throw new Error("Amount must be greater han 0");
    const transaction = await sequelize.transaction();
    try{
        const [senderWallet] = await sequelize.query('select * from wallets where user_id = ?', {replacements: [fromUserId], transaction});
        if (!senderWallet.length) throw new Error("Sender wallet not found.");
        if (senderWallet[0].balance < amount) throw new Error("Insuffecient fund");

        const [receiverWallet] = await sequelize.query('select * from wallets where user_id = ?', {replacements: [toUserId], transaction});
        if (!senderWallet.length) throw new Error("Receiver wallet not found.");

        // debit
        await sequelize.query('update wallets set balance = balance - ? where user_id = ?', {replacements: [amount, fromUserId], transaction});
        // credit
        await sequelize.query('update wallets set balance = balance + ? where user_id = ?', {replacements: [amount, toUserId], transaction});

        await sequelize.query('insert into transactions (from_user_id, to_user_id, amount, status) values (?,?,?,?)', {replacements:[fromUserId, toUserId, amount, 'SUCCESS'], transaction})    
        transaction.commit();
        return {message: "Tranfer completed."}
    }catch(err){
        await transaction.rollback();
        throw err;
    }
};