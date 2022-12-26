/**
 * NOTE: assumes
 * column B (index 1) = sentence
 * column C (index 2) = bolded word in sentence
 */

/**
 * NOTE: keep the capitalization in "word to bold" column the same as it is in "sentence"!
 */

const originalTSV = `Replace me with the TSV!`;

// finds any backticks before commencing
if (originalTSV.includes("`")) {
  alert("There's a backtick in your TSV! Remove them before using script");
  console.log("exited script");
} else {
  const separatedList = originalTSV.split("\n");

  /**
   * splits TSV into individual lines and operates on each line
   * replaces the bolded **word** in sentence with <b>word</b>
   */
  const newJoinedLists = [];
  const errorExists = false;
  separatedList.forEach((list) => {
    const tempList = list.split("\t");
    // see answer by bormat https://stackoverflow.com/questions/2449779/why-cant-i-use-accented-characters-next-to-a-word-boundary
    const boldWord = new RegExp(
      `(?<![A-Za-zÀ-ÖØ-öø-ÿ])${tempList[2]}(?![A-Za-zÀ-ÖØ-öø-ÿ])`
    );
    const newTempList = tempList[1].replace(boldWord, `<b>${tempList[2]}</b>`);
    // check if word was replaced, if not, alert user
    if (newTempList === tempList[1]) {
      alert(
        `Word #${tempList[0]} was not replaced. Please check for errors, perhaps the lettercase is not the same`
      );
      errorExists = true;
    }
    tempList[1] = newTempList;
    const newList = tempList.join("\t");
    newJoinedLists.push(newList);
  });

  const newTSV = newJoinedLists.join("\n");

  if (errorExists) {
    console.log("fix errors then rerun script");
  } else {
    console.log(newTSV);
  }
}
