// create mongoose user models
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { MemberDocument } from '@type/member'

const schema = new Schema<MemberDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
    fname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 32,
    },
    password: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
    role: {
      type: String,
      required: true,
      default: 'member',
    },
  },
  {
    collection: 'members',
    timestamps: true,
  }
)

schema.methods.encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(8)
  const hashPassword = bcrypt.hashSync(password, salt)
  return hashPassword
}

schema.methods.checkPassword = function (password: string): boolean {
  const isValid = bcrypt.compareSync(password, this.password)
  return isValid
}
const Member = mongoose.model<MemberDocument>('Members', schema)

export default Member
