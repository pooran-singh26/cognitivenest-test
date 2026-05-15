import {
  createUser,
  addBalance,
  transferMoney,
} from "../service/walletService.js";

export const createUserProfile = async (req, resp) => {
  try {
    const { name, email } = req.body;
    const user = await createUser(name, email);
    return resp.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return resp.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const appendBalance = async (req, resp) => {
  try {
    const userId = req.params.userId;
    const amount = req.body.amount;

    const result = await addBalance(userId, amount);

    return resp.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return resp.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

export const moneyTransfer = async (req, resp) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;

    const result = await transferMoney(fromUserId, toUserId, amount);

    return resp.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return resp.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
