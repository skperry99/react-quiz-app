// import { useState } from "react";
import { rightResponse, wrongResponse } from "../helpers/feedback";
import { getRandom } from "../helpers/helpers";

const Feedback = ({ isRight }) => {
  let response = isRight ? getRandom(rightResponse) : getRandom(wrongResponse);
  return <div id="feedback">{response}</div>;
};

export default Feedback;
