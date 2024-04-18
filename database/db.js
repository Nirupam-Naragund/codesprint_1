import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect('mongodb+srv://gdscnmit:mvlzjnvynWdhRRz4@codesprint.ln7in3x.mongodb.net/codesprint');
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;