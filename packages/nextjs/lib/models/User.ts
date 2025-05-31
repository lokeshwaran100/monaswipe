import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  address: String,
  amount: String,
  value: String
});

const WalletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  provider: {
    type: String,
    enum: ['privy', 'coinbase'],
    required: true,
  },
  network: {
    type: String,
    default: 'base-sepolia'
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wallet: WalletSchema,
  portfolio: [PortfolioSchema],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);