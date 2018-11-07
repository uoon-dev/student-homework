const myLottos = []
const LOTTONUM = 6 
// 로또 번호 개수를 상수화 시킨 점 넘 좋습니다!
// 그렇지만 LOTTONUM -> LOTTO_NUMBER_COUNT(개수)가 조금 더 의미에 맞을 것 같아요.

const buyLottos = (money) => {
    const price = 1000;
    const numLottos = parseInt(money / price); 
    // money -> myMoney, numLottos -> lottoCount가 조금 더 이해하기 쉬울 것 같아요.

    const lottos = new Array(numLottos).fill(new Array(LOTTONUM).fill(0)).map(lotto => {
      // 함수 chaining을 잘 활용하신 것 같아요 굿굿!
        return lotto.map(value => {
            let randomNum; 
            do {
                randomNum = Math.floor((Math.random() * 45) + 1);
            }while(lotto.some(value => value === randomNum))
            return value = randomNum;
        }).sort((a, b) => a - b); 
        // lotto 번호는 무작위이기 때문에 순서를 정해주는 sort는 없어도 될 듯해요 :) 혹시 특별한 이유가 있었나요?
    });
    // 아래 lottos.forEach()랑 위에 두번째 map이랑 역할이 겹치는 것 같아요.

    console.log("로또 "+numLottos+"개를 발행했습니다.");
    lottos.forEach(lotto => {
        myLottos.push(lotto);
        console.log(lotto);
    });

    // 짜신 코드를 바탕으로 한다면 저라면 이렇게 짤 듯해요. 
    /* 
      const emptyLottos = new Array(numLottos).fill(0); // 그런데 사실 이럴 땐 for를 써도 되긴 해요 ㅎㅎ
        emptyLottos.forEach(() => {
          const myLotto = new Array(LOTTONUM).fill(0).map(() => Math.floor((Math.random() * 45) + 1));
          myLottos.push(myLotto);
        })
      return myLottos;
    */ 
    return lottos;
}

// 내 로또를 발행하는 함수/ 로또의 럭키 번호를 세팅하는 함수 / 정답을 비교하는 함수 / 결과를 출력하는 함수
// 이렇게 4가지로 구분하는 게 좋을 듯합니다.

const setLuckyNumber = (winningNums) => {
    const myResults = new Array(LOTTONUM).fill(0); 
    myLottos.forEach((myLotto, index) => { // index를 안 쓴다면 지워줍니당!
        let matched = 0;
        myLotto.forEach(value => {
            if(winningNums.some(wn => value === wn)) 
            // forEach -> forEach -> some까지..! 시간복잡도가 n^3입니다! some이 꼭 필요할까요?
                matched++;
        })
        myResults[matched]++;
    })

    // 5000, 50000원 같은 금액은 상수화 하는 게 좋을 듯해요 :) 
    const profit = parseInt((myResults[2]*5000 + myResults[3]*50000 + myResults[4]*1500000 + myResults[5]*2000000000)/(myLottos.length*1000))*10;

    // 출력하는 함수는 displayResult나 displayToScreen 같이 따로 뺴서 구분하는 게 좋을 듯합니다.
    console.log("당첨통계");
    console.log("---------");
    console.log("3개 일치 (5000원) - "+myResults[2]+"개");
    console.log("4개 일치 (50000원) - "+myResults[3]+"개");
    console.log("5개 일치 (1500000원) - "+myResults[4]+"개");
    console.log("6개 일치 (2000000000원) - "+myResults[5]+"개");
    console.log("나의 수익률은 "+profit+"%입니다.");

    return myResults;
}

/* 
  전반적으로 함수형과 체이닝을 활용하시려는 노력이 보여서 좋습니다 ㅎㅎ
  하지만 기능을 좀 더 세분화하는 게 필요할 것 같아요. 다음 수업 때까지 한번 더 리팩토링 고고 합시당! 
*/
