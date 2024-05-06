module.exports = [
  {
    question: (moveName) =>
      `What's the frame advantage/disadvantage of ${moveName} on block?`,
    ref: "onBlock",
    difficulty: "hard",
    answer: (onBlock) => {
      if (Math.abs(onBlock) === 1) return `${onBlock} frame`
      return `${onBlock} frames`
    },
  },
  {
    question: (moveName) =>
      `What's the frame advantage/disadvantage of ${moveName} on hit?`,
    ref: "onHit",
    difficulty: "medium",
    answer: (onHit) => `${onHit} frames`,
  },
  {
    question: (moveName) => `Is ${moveName} cancelable into a special move?`,
    ref: "xx",
    difficulty: "easy",
    answer: (xxArray) =>
      Array.isArray(xxArray) && xxArray.includes("sp") ? "Yes" : "No",
  },
  {
    question: (moveName) => `Is ${moveName} cancelable into a super?`,
    ref: "xx",
    difficulty: "medium",
    answer: (xxArray) =>
      (Array.isArray(xxArray) && xxArray.includes("su")) ||
      (Array.isArray(xxArray) && xxArray.includes("su2")) ||
      (Array.isArray(xxArray) && xxArray.includes("su3"))
        ? "Yes"
        : "No",
  },
  {
    question: (moveName) => `Is ${moveName} chainable?`,
    ref: "xx",
    difficulty: "easy",
    answer: (xxArray) =>
      Array.isArray(xxArray) && xxArray.includes("ch") ? "Yes" : "No",
  },
  {
    question: (moveName) => `Is ${moveName} plus, neutral, or minus on block?`,
    ref: "onBlock",
    difficulty: "easy",
    answer: (onBlock) => {
      if (onBlock > 0) return `Plus`
      else if (onBlock === 0) return "Neutral"
      return "Minus"
    },
  },
]
