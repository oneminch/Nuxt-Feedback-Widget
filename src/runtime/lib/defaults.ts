import HappyFace from "../components/icons/HappyFace.vue";
import SadFace from "../components/icons/SadFace.vue";
import NeutralFace from "../components/icons/NeutralFace.vue";

export const feedbackOptions = [
  { id: "unsatisfied", value: "Unsatisfied", label: "Sad", icon: SadFace },
  { id: "neutral", value: "Neutral", label: "Neutral", icon: NeutralFace },
  { id: "satisfied", value: "Satisfied", label: "Happy", icon: HappyFace },
];
