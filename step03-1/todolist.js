// 할 일 객체 -> Todo
// 할 일 id 생성하고 내용 추가하는 함수 -> add $ '내용'
// 해당 상태에 저장된 할 일 조회 함수 -> show $ '상태'
// 할 일 상태 업데이트 함수 -> update $ 'id' $ '상태'
// 구분자는 $, 구분자 간의 공백은 무시
// 함수형 프로그래밍 지향
// 잘못된 명령어 입력시 오류 메시지 출력

const allthings = []

const createTodoId = () => {
    return allthings.length + 1;
}

class Todo {
    constructor(contents) {
        this._id = createTodoId();
        this._contents = contents;
        this._status = "todo"; // 기본값
    }

    get getId() {return this._id;}
    get getContents() {return this._contents;}
    get getStatus() {return this._status;}

    set setContents(contents) {this._contents = contents;}
    set setStatus(status) {this._status = status;}
}

const command = (input) => {
    const patchedInput = input.toLowerCase().split("$").map(text => text.trim());
    const cmd = patchedInput[0];

    switch(cmd){
        case "add":
            const newContents = patchedInput[1];
            addThing(newContents);
            displayCurrentStatus();
            break;

        case "show":
            const status = patchedInput[1];
            showThings(status);
            break;

        case "update":
            const id = patchedInput[1];
            const newStatus = patchedInput[2];
            updateThing(id, newStatus);
            displayCurrentStatus();
            break;

        default:
            console.log("Error: wrong command");
    }
}

// 현재상태 :  todo:1개, doing:1개, done:3개  //변경된 모든 상태가 노출.
const displayCurrentStatus = () => {
    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;
    allthings.forEach(thing => {
        switch(thing._status){
            case "todo":
                todoCount++;
                break;
            case "doing":
                doingCount++;
                break;
            case "done":
                doneCount++;
                break;
        }
    })

    console.log("현재상태 : todo:"+todoCount+"개, doing:"+doingCount+"개, done:"+doneCount+"개");
}

const addThing = (newContents) => {
    const newTodo = new Todo(newContents);
    allthings.push(newTodo);
    console.log('id: '+newTodo._id+', "'+newTodo._contents+'" 항목이 새로 추가됐습니다.');
}

const showThings = (status) => {
    switch(status){
        case "todo":
        case "doing":
        case "done":
            allthings.filter(thing => thing.getStatus === status)
                .forEach(filtered => console.log(filtered.getId + ", " + filtered.getContents));
            break;
        default:
            console.log("Error: wrong status");
    }
    }

const updateThing = (id, newStatus) => {
    if(!isNaN(id) && isNaN(newStatus)){
        allthings[id - 1].setStatus = newStatus;
    }else{
        console.log("Error: wrong parameters");
    }
    
}

command("add$웹 개발 공부하기")
console.log('----')
command("shoW$todo")
console.log('----')
command("upDate   $1$done")
displayCurrentStatus()
