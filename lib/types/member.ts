import type { ObjectId, Document, Model } from "mongoose";

interface Member {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  tel: string;
  cartId: ObjectId
  dateOfBirth?: Date;
  dateCreated: Date;
  status: 'active' | 'inactive' | 'suspended' | 'terminated';
}

interface MemberDocument extends Member, Document {
  encryptPassword: (password: string) => string;
  checkpassword: (password: string) => boolean;
}

interface MemberModel extends Model<MemberDocument> {
  findByUsername: (username: string) => Promise<MemberDocument>;
}

interface Cart {
  memberId: string;
  items: {
    productId: string;
    variations: string;
    quantity: number;
  }[];
};

export { Member, MemberDocument, MemberModel, Cart };

