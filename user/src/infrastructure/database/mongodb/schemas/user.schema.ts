import mongoose, { Schema, Document, Model } from "mongoose";


interface UserAttr {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  // assessedSkills?: string[];
  // headline?: string;
  // bio?: string;
  // githubUrl?: string;
  // linkedinUrl?: string;
  // expirience?: string;
  isGoogle?: boolean;
  lastNameChange?: string;
}


interface UserModel extends Model<UserDoc> {
  build(attributes: UserAttr): UserDoc;
}

interface UserDoc extends Document {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  // assessedSkills?: string[];
  // headline?: string;
  // bio?: string;
  // githubUrl?: string;
  // linkedinUrl?: string;
  // expirience?: string;
  isGoogle: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastNameChange?: Date;
}




const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    avatar: { type: String },
    isGoogle: { type: Boolean, default: false },
    lastNameChange: { type: Date, default: null },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);



userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
