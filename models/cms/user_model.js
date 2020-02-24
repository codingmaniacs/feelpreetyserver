var userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date
  }, schemaOptions);