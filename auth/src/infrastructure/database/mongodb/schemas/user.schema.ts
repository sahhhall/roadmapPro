import mongoose, { Mongoose } from "mongoose";
import { Password } from "../../../../application/services/PasswordHash";

interface AuthAttr {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

//  Mongoose Model with a custom build method
interface AuthModal extends mongoose.Model<AuthDoc> {
  build(attributes: AuthAttr): AuthDoc;
}


interface AuthDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  isBlocked: boolean;
  isGoogle: boolean;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isGoogle: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
    timestamps: true,
  }
);


// authSchema.pre("save", async function (done) {
//   if (this.isModified("password")) {
//     const hashed = await Password.toHash(this.get("password"));
//     this.set("password", hashed);
//   }
//   done();
// });


authSchema.statics.build = (attrs: AuthAttr) => {
  return new Auth(attrs);
};


const Auth = mongoose.model<AuthDoc, AuthModal>("Auth", authSchema);

export { Auth };
