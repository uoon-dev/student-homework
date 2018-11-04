// 내 로또를 발행하는 함수 -> buyLottos
// 로또 하나를 만들어주는 함수 -> createLotto
// 로또의 럭키 번호를 세팅하는 함수 -> setLuckyNumber
// 정답을 비교하는 함수 -> compareNumber
// 결과를 출력하는 함수 -> showResults

// 적절한 변수명으로 변경: LOTTONUM -> LOTTO_NUMBER_COUNT(개수)
const LOTTO_NUMBER_COUNT = 6 
const LOTTO_TOTAL_NUMBER = 45
const LOTTO_PRICE = 1000

// 당첨 상금 정보 배열로 설정
// 인덱스 = 일치한 숫자의 갯수, 인덱스에 따른 배열값 = 일치한 숫자에 맞는 상금.
const PRIZE_MONEY_INFO = [0,0,0,5000,50000,1500000,2000000000]

const myLottos = []

const buyLottos = (myMoney) => {
    const lottoCount = parseInt(myMoney / LOTTO_PRICE); // 적절한 변수명으로 변경.

    console.log("로또 "+lottoCount+"개를 발행했습니다.");

    for(let i = 0; i < lottoCount; i++){
        const newLotto = createLotto();
        
        console.log(newLotto);
        myLottos.push(newLotto);
    }
}

const createLotto = () => {
    const tempLotto = new Array(LOTTO_TOTAL_NUMBER+1).fill(0);
    let count = 0;
    while(count < LOTTO_NUMBER_COUNT){
        const randomPick = Math.floor((Math.random() * LOTTO_TOTAL_NUMBER) + 1);
        if(tempLotto[randomPick] === 0){
            tempLotto[randomPick]++;
            count++;
        }
    }

    const newLotto = [];
    tempLotto.forEach((number, index) => {
        if(number != 0) newLotto.push(index);
    })

    return newLotto;
}

const setLuckyNumber = (luckyNumbers) => {
    const myResults = new Array(LOTTO_NUMBER_COUNT+1).fill(0); 

    myLottos.forEach((myLotto) => { 
        const matchedCount = compareNumber(myLotto,luckyNumbers);
        myResults[matchedCount]++;
    })

    showResults(myResults);
}

// (참고1) 기준값 = luckyNumber, 대상값 = myNumber
// 1) 기준값이 대상값보다 크면, 대상 배열의 인덱스를 +1 합니다. (다음 인덱스에 기준값이 있을 수도 있으니)
// 2) 기준값이 대상값보다 작으면, 기준 배열의 인덱스를 +1 합니다. (다음 인덱스에 기준값이 존재할 수 없기에)
// 3) 기준값이 대상값과 동일하면, 기준 배열의 인덱스와 대상 배열의 인덱스를 +1 합니다. 또한 일치된 숫자의 개수도 +1 합니다.
// (참고2) 시간복잡도 = 2n
const compareNumber = (myNumbers, luckyNumbers) => {
    let matchedCount = 0;
    let myIndex = 0;
    let luckyIndex = 0;

    while(luckyIndex < LOTTO_NUMBER_COUNT){
        const luckyNumber = luckyNumbers[luckyIndex];
        while(myIndex < LOTTO_NUMBER_COUNT){
            const myNumber = myNumbers[myIndex];
            if(luckyNumber < myNumber){
                break;
            } else if(luckyNumber === myNumber){
                myIndex++;
                matchedCount++;
                break;
            }
            myIndex++;
        }
        luckyIndex++;
    }

    return matchedCount;
}

const showResults = (myResults) => {
    console.log("당첨통계");
    console.log("---------");

    const myMoney = LOTTO_PRICE * myLottos.length;
    let myProfit = 0;

    myResults.forEach((myResult, index) => {
        myProfit += PRIZE_MONEY_INFO[index] * myResult;
        if(index > 2) console.log(index+"개 일치 ("+PRIZE_MONEY_INFO[index]+"원) - "+myResult+"개");
    })

    myProfit = parseInt((myProfit - myMoney) / myMoney * 100);
    console.log("나의 수익률은 "+myProfit+"%입니다.");
}
