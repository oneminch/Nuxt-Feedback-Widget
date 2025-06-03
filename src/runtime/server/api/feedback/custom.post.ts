import {
  defineEventHandler /* , readBody, useRuntimeConfig */,
} from "#imports";

export default defineEventHandler(async (/* event */) => {
  try {
    console.log("Feedback submitted to custom endpoint");
  } catch (error) {
    // console.log(error);
    return error;
  }
});
