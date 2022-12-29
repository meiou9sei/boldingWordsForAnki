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
    const sentenceWithBoldedWord = tempList[1].replace(
      boldWord,
      `<b>${tempList[2]}</b>`
    );
    // check if word was replaced, if not, alert user
    if (sentenceWithBoldedWord === tempList[1]) {
      alert(
        `Word #${tempList[0]} was not replaced. Please check for errors, perhaps the lettercase is not the same`
      );
      errorExists = true;
    }
    tempList[1] = sentenceWithBoldedWord;

    // next bit is custom for my sheets/deck, reorders fields so I can import without reordering anki's suggested fields
    // from here
    tempList[0] = tempList[1];
    tempList[1] = tempList[3];
    tempList[2] = tempList[4];
    tempList[3] = tempList[9];
    tempList.splice(4);
    // to here

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
