let board = [] //包含0-0 到 4-4的数组
let hasConficted = [] //用于检测是否叠加过
let score = 0 //记录分数
$(function () {
    newGame()
    $('#btn').click(newGame) //NewGame按键
})
function newGame() {
    createCell()
    createNewNumber() //生成随机数字
    createNewNumber()
}

function createCell() { //创建数字块
    // 创建每个数字块的初始值
    for (let i = 0; i < 4; i++) {
        // // 清除游戏面板
        // $('.number-Cells').remove()

        //定义一个二维数组
        board[i] = []
        hasConficted[i] = []
        for (let j = 0; j < 4; j++) {
            // 设置数字块初始值
            board[i][j] = 0
            hasConficted[i][j] = false
        }
    }

    // 创建初始数字块
    updateNumberCells()
    // 重置分数
    score = 0
    $("#score").text(score)
}

function updateNumberCells() {
    $('.number-Cells').remove()
    for (let i = 0; i < 4; i++) {
        // 清除游戏面板
        //定义一个二维数组
        for (let j = 0; j < 4; j++) {
            // 创建新的数字块
            $('#grid-container').append('<div id="number-Cell' + i + '-' + j + '" class="number-Cells"></div>')
            let $numberCell = $('#number-Cell' + i + '-' + j + '')


            // 判断生成条件
            // 如果该数字块值为0，不创建
            if (board[i][j] == 0) {
                $numberCell.css({
                    width: '0px',
                    height: '0px',
                    // 通过getPosTop()，方法设置每个数字格距离顶端的距离
                    top: getPosTop(i) + 'px',
                    // 通过getPosLeft()，方法设置每个数字格距离左端的距离
                    left: getPosLeft(j) + 'px'
                })
            } else { //如果该数字块值不为0，创建对于值的数字块
                $numberCell.css({
                    width: '100px',
                    height: '100px',
                    top: getPosTop(i) + 'px',
                    left: getPosLeft(j) + 'px',
                    backgroundColor: getNumberBackgroundColor(board[i][j]),
                    color: 'black'
                }).text(board[i][j]) //添加文字
            }

            hasConficted[i][j] = false
        }
    }
}
function createNewNumber() { //创建随机初始数字
    if(nospace(board)){ //检查有无空间
		return false ;  
    }
    // 生成随机坐标
    let randomX = Math.floor(Math.random()*4)
    let randomY = Math.floor(Math.random()*4)
    // 检查坐标数字块是否有数字
    while (true) {
        if(board[randomX][randomY]==0){
            break
        }
        // 如果有数字就重新随机
        randomX = Math.floor(Math.random()*4)
        randomY = Math.floor(Math.random()*4)
    }
    // 生成2/4,2生成概率大一点
    let randomNunber = Math.random() < 0.7 ? 2:4
    board[randomX][randomY] = randomNunber

    // 显示随机格
    showNumber(randomX,randomY,board[randomX][randomY]) 
}



function test(n,m) { //创建随机初始数字
    // 生成随机坐标
    let randomX = n
    let randomY = 0
    // 检查坐标数字块是否有数字
    while (true) {
        if(board[randomX][randomY]==0){
            break
        }
        // 如果有数字就重新随机
        randomX = 0
        randomY = Math.floor(Math.random()*4)
        // randomX = Math.floor(Math.random()*4)
        // randomY = Math.floor(Math.random()*4)
    }
    // 生成2/4
    let randomNunber = Math.random() < 0.7 ? 2:4
    // board[randomX][randomY] = randomNunber
    board[randomX][randomY] = m

    // 显示随机格
    showNumber(randomX,randomY,board[randomX][randomY]) 
}

function isgameover(){ //判断是否结束游戏
	if(nospace(board) && nomove(board)){
		gameover()
	}
}

function nospace(board){ //判断有无空间
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 0 ; j < 4 ; j++ ){
			if(board[i][j] == 0){
				return false ;
            }
		}
        console.log('2')
	return true ;
}

function nomove(board){ //判断能否移动
	if(canMoveLeft(board) || canMoveRight(board)
		|| canMoveDown(board) || canMoveUp(board)){
        return false ;
    }
    console.log('1')
	return true ;
}

function gameover(){
    console.log('3')
	alert("game over!")
}