/**
 * NOTE: assumes
 * column B (index 1) = sentence
 * column C (index 2) = bolded word in sentence
 */

/**
 * NOTE: keep the capitalization in "word to bold" column the same as it is in "sentence"!
 * else you will replace the word in "sentence" with however "word to bold" is capitalized
 */

const originalTSV = `11	¡Ademàs, soy muy bueno peleando!	Peleando	pelear	to fight	1	One_Piece	manga	2022/12/18	wordCount:11 chapter:1 IPTag:One_Piece mediaTag:manga dateMined:2022/12/18
12	¡¡Mi puñetazo es tan fuerte como una bala!!	puñetazo	el puñetazo	punch with the fist, thump	1	One_Piece	manga	2022/12/18	wordCount:12 chapter:1 IPTag:One_Piece mediaTag:manga dateMined:2022/12/18
13	¿Una bala? Wow, ¿de verdad? - ¿¡Que tipo de tono es ese!?	bala	la bala	bullet	1	One_Piece	manga	2022/12/18	wordCount:13 chapter:1 IPTag:One_Piece mediaTag:manga dateMined:2022/12/18`;

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
  const errorFlag = false;
  separatedList.forEach((list) => {
    const tempList = list.split("\t");
    const boldWord = new RegExp(`\\b${tempList[2]}\\b`);
    const newTempList = tempList[1].replace(boldWord, `<b>${tempList[2]}</b>`);
    // check if word was replaced, if not, throw error
    if (newTempList === tempList[1]) {
      alert(
        `Word #${tempList[0]} was not replaced. Please check for errors, perhaps the lettercase is not the same`
      );
    }
    tempList[1] = newTempList;
    const newList = tempList.join("\t");
    newJoinedLists.push(newList);
  });

  const newTSV = newJoinedLists.join("\n");

  if (!errorFlag) {
    console.log("fix errors then rerun script");
  } else {
    console.log(newTSV);
  }
}
