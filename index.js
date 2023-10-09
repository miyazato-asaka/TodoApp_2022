// タスクデータを作ろう
const tasks = [
    {id: 1, name: "部屋の片づけ"},
    {id: 2, name: "買い物" }
]

// HTML要素の取得
const template = document.getElementById('taskTemplate');
const tbody = document.getElementById('tasks');

//初期表示
//タスクデータの読み込み
tasks.forEach((t) => {
    addTask(t.id, t.name);
});

//入力フォームのイベントハンドラを実装
const form = document.getElementById('form');
//submitイベント
form.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log("Enter!!!");

    //入力値の取得
    const input = document.getElementById('input');
    const value = input.value;

    //タスクデータを追加する
    if(!value) return; //未入力の場合スキップ

    const task = {id: tasks.length + 1, name: value};
    addTask(task.id, task.name);

    //後処理
    tasks.push(task); //タスクリストにデータを追加
    input.value = ""; //入力フォームのリセット
});

//タスク全消しイベントハンドラを実装
const deleteAllButton = document.getElementById('deleteAll');
deleteAllButton.addEventListener("click", () => {
    const tbody = document.getElementById('tasks');
    tbody.innerHTML = "";
});

// タスクの追加
function addTask(id, taskName){
    //templateを取得
    const clone = template.content.cloneNode(true);

    const tr = clone.querySelector("tr");
    const name = clone.querySelector(".name");
    const deleteButton = clone.querySelector(".delete");
    const deadLine = clone.querySelector(".deadline");

    //パラメータの設定
    tr.setAttribute("id", id);
    name.textContent = taskName;

    //デフォルトで今日を期限とする
    //現在日付を作成　yyyy-mm-dd
    let d = new Date();
    let dateText = d.getFullYear() + "-" + ("0"+(d.getMonth() + 1)).slice(-2) + "-" + ("0"+d.getDate()).slice(-2);
    deadLine.value = dateText;

    //削除ボタンのイベントハンドラ追加
    deleteButton.addEventListener('click', () => {
        const target = document.getElementById(id);

        //テーブルから削除
        tbody.removeChild(target);
        document.removeEventListener('click', deleteButton);
    });

    //テーブルに追加
    tbody.appendChild(clone);
}



