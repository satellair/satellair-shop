import type { ObjectId, Document, Model } from 'mongoose'

interface Member {
  fname: string
  lname: string
  username: string
  email: string
  password: string
  tel: string
  status: 'active' | 'inactive' | 'suspended' | 'terminated'
  role: 'admin' | 'member'
}

interface MemberDocument extends Member, Document {
  encryptPassword: (password: string) => string
  checkPassword: (password: string) => boolean
}

interface MemberModel extends Model<MemberDocument>, Member {
  findByUsername: (username: string) => Promise<MemberDocument>
}

export { Member, MemberDocument, MemberModel }
