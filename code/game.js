// 键盘按下监听
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:  //左
            if (numberMoveLeft()) { 
                setTimeout("createNewNumber()", 200)
            }else{
                isgameover()
            }
            break;
        case 38: //上
            if (numberMoveUp()) {
                setTimeout("createNewNumber()", 200)
            }else{
                isgameover()
            }
            break;
        case 39: //右
            if (numberMoveRight()) {
                setTimeout("createNewNumber()", 200)
            }else{
                isgameover()
            }
            break;
        case 40: //下
            if(numberMoveDown()){
                setTimeout("createNewNumber()", 200)
            }else{
                isgameover()
            }
            break;
        default:
            break;
    }
})

function numberMoveLeft() { //向左移动、叠加
    if (!canMoveLeft(board)) { //判断能否移动
        return false
    }
    let count = [] //记录空格数
    let MergeTimes = [] //记录可叠加数
    // 向左移动
    for (let i = 0; i < 4; i++) {

        count[i] = []
        MergeTimes[i] = []

        for (let j = 0; j < 4; j++) { //遍历第一层
            let length = count[i].length
            let MTlength = MergeTimes[i].length
            if (board[i][j] == 0) { //如果有空格，记录
                count[i].push(board[i][j])
            }
            else if (board[i][j] != 0) { //如果不为空
                if (board[i][j] != 0 && j != 0) { //不为空且不在第一位
                    // console.log(j,MTlength,length,hasConficted[i][j - length - MTlength])
                    numberCellsMoveAnimationLeft(i, j, length) //向前移动空格数距离
                    board[i][j - length] = board[i][j] 
                    // console.log(j,board[i][j])
                    if (board[i][j - length] == board[i][j - length - MTlength] && MTlength != 0) { //如果当前格与前一格值相等，且有记录叠加数
                        if (hasConficted[i][j - length - MTlength]) { //如果前一格有进行过叠加，阻止新一次叠加
                            // console.log('1')
                            numberCellsMoveAnimationLeft(i, j, length - MTlength + 1)
                            board[i][j - length - MTlength + 1] = board[i][j - length]
                            board[i][j - length] = 0
                        }else{ //前一值没有进行过叠加
                            // console.log('2')
                            numberCellsMoveAnimationLeft(i, j, length + MTlength)
                            board[i][j - length - MTlength] += board[i][j - length] //数值相加
                            board[i][j - length] = 0

                            score += (board[i][j - length - MTlength]) // 更新分数
                            updateScore(score)

                            hasConficted[i][j - length - MTlength] = true //将当前格记录为进行过叠加
                        }
                    }else if(board[i][j - length] != board[i][j - length - MTlength] && MTlength != 0){ //如果当前格与前一格值不等，且有记录叠加数
                        // console.log('3')
                        numberCellsMoveAnimationLeft(i, j, length + MTlength)
                        board[i][j - length - MTlength] = board[i][j - length]
                        board[i][j - length] = 0
                    }
                    // console.log(j,board[i][j-length - MTlength])
                    for (let a = j + 1; a < 4; a++) { //遍历当前值之后的数字格
                        if (board[i][j - length - MTlength] == board[i][a] && board[i][a] !=0 
                            && !hasConficted[i][j - length - MTlength]) { //如果当前格与后面的数字格值相等，后面格不为0，且当前格没有进行过叠加
                            // console.log('4')
                            MergeTimes[i].push(j) //记录叠加数
                            break //停止循环，防止多次记录
                        }else if(board[i][j - length - MTlength] == board[i][a] && board[i][a] !=0){ //如果当前格与后面的数字格值相等，后面格不为0
                            MergeTimes[i].push(j)
                            break //停止循环，防止多次记录
                        }else if(board[i][j - length - MTlength] != board[i][a] && board[i][a] !=0){ //如果后面格有一个不相同的值，马上停止
                            break
                        }
                    }
                    if(j - length != j){ //如果该格进行过移动，消除移动前的数字格
                        board[i][j] = 0
                    }
                }
                if(j == 0){ //如果当前为第一格
                    for(let a = j+1;a < 4;a++){
                        if(board[i][j] != board[i][a] && board[i][a] != 0){ //如果当前格与后面格不相等，且都不为0，即不会发生叠加，停止记录叠加数
                            break
                        }else if(board[i][j] == board[i][a] && board[i][a] != 0){ //如果当前格与后面格相等。且都不为0，记录叠加数
                            MergeTimes[i].push(j)
                            break //停止循环，防止多次记录
                        }
                    }
                }
            }
        }
    }
    count = []
    MergeTimes = [] //重置计数器
    setTimeout("updateNumberCells()", 200) //延迟刷新
    return true //可以移动

}

function numberMoveRight() {
    if (!canMoveRight(board)) { //判断能否移动
        return false
    }
    let count = [] //记录空格数
    let MergeTimes = [] //记录可叠加数
    // 向左移动
    for (let i = 0; i < 4; i++) {

        count[i] = []
        MergeTimes[i] = []

        for (let j = 3; j >= 0; j--) { //遍历第一层
            let length = count[i].length
            let MTlength = MergeTimes[i].length
            if (board[i][j] == 0) { //如果有空格，记录
                count[i].push(board[i][j])
            }
            else if (board[i][j] != 0) { //如果不为空
                if (board[i][j] != 0 && j != 3) { //不为空且不在第一位
                    // console.log(j,MTlength,length)
                    numberCellsMoveAnimationRight(i, j, length) //向前移动空格数距离
                    board[i][j + length] = board[i][j] 
                    // console.log(j,board[i][j])
                    if (board[i][j + length] == board[i][j + length + MTlength] && MTlength != 0) { //如果当前格与前一格值相等，且有记录叠加数
                        if (hasConficted[i][j + length + MTlength]) { //如果前一格有进行过叠加，阻止新一次叠加
                            // console.log('1')
                            numberCellsMoveAnimationRight(i, j, length + MTlength - 1)
                            board[i][j + length + MTlength - 1] = board[i][j + length]
                            board[i][j + length] = 0
                        }else{ //前一值没有进行过叠加
                            // console.log('2')
                            numberCellsMoveAnimationRight(i, j, length + MTlength)
                            board[i][j + length + MTlength] += board[i][j + length] //数值相加
                            board[i][j + length] = 0

                            score += (board[i][j + length + MTlength]) // 更新分数
                            updateScore(score)

                            hasConficted[i][j + length + MTlength] = true //将当前格记录为进行过叠加
                        }
                    }else if(board[i][j + length] != board[i][j + length + MTlength] && MTlength != 0){ //如果当前格与前一格值不等，且有记录叠加数
                        // console.log('3')
                        numberCellsMoveAnimationRight(i, j, length + MTlength)
                        board[i][j + length + MTlength] = board[i][j + length]
                        board[i][j + length] = 0
                    }
                    // console.log(j,board[i][j-length - MTlength])
                    for (let a = j - 1; a >= 0; a--) { //遍历当前值之后的数字格
                        if (board[i][j + length + MTlength] == board[i][a] && board[i][a] !=0 
                            && !hasConficted[i][j + length + MTlength]) { //如果当前格与后面的数字格值相等，后面格不为0，且当前格没有进行过叠加
                            // console.log('4',a)
                            MergeTimes[i].push(j) //记录叠加数
                            break //停止循环，防止多次记录
                        }else if(board[i][j + length + MTlength] == board[i][a] && board[i][a] !=0){ //如果当前格与后面的数字格值相等，后面格不为0
                            // console.log('5')
                            MergeTimes[i].push(j)
                            break //停止循环，防止多次记录
                        }else if(board[i][j + length + MTlength] != board[i][a] && board[i][a] !=0){
                            break
                        }
                    }
                    if(j + length != j){ //如果该格进行过移动，消除移动前的数字格
                        board[i][j] = 0
                    }
                }
                if(j == 3){ //如果当前为第一格
                    for(let a = j - 1;a >= 0;a--){
                        if(board[i][j] != board[i][a] && board[i][a] != 0){ //如果当前格与后面格不相等，且都不为0，即不会发生叠加，停止记录叠加数
                            break
                        }else if(board[i][j] == board[i][a] && board[i][a] != 0){ //如果当前格与后面格相等。且都不为0，记录叠加数
                            // console.log('10')
                            MergeTimes[i].push(j)
                            break //停止循环，防止多次记录
                        }
                    }
                }
            }
        }
    }
    count = []
    MergeTimes = [] //重置计数器
    setTimeout("updateNumberCells()", 200) //延迟刷新
    return true //可以移动
}

function numberMoveUp() {
    if (!canMoveUp(board)) { //判断能否移动
        return false
    }
    let count = [] //记录空格数
    let MergeTimes = [] //记录可叠加数
    // 向左移动
    for (let j = 0; j < 4; j++) {

        count[j] = []
        MergeTimes[j] = []

        for (let i = 0; i < 4; i++) { //遍历第一层
            let length = count[j].length
            let MTlength = MergeTimes[j].length
            if (board[i][j] == 0) { //如果有空格，记录
                count[j].push(board[i][j])
            }
            else if (board[i][j] != 0) { //如果不为空
                if (board[i][j] != 0 && i != 0) { //不为空且不在第一位
                    // console.log(j,MTlength,length,hasConficted[i][j - length - MTlength])
                    numberCellsMoveAnimationUp(i, j, length) //向前移动空格数距离
                    board[i - length][j] = board[i][j] 
                    // console.log(j,board[i][j])
                    if (board[i - length][j] == board[i - length - MTlength][j] && MTlength != 0) { //如果当前格与前一格值相等，且有记录叠加数
                        if (hasConficted[i - length - MTlength][j]) { //如果前一格有进行过叠加，阻止新一次叠加
                            // console.log('1')
                            numberCellsMoveAnimationUp(i, j, length - MTlength + 1)
                            board[i - length - MTlength + 1][j] = board[i - length][j]
                            board[i - length][j] = 0
                        }else{ //前一值没有进行过叠加
                            // console.log('2')
                            numberCellsMoveAnimationUp(i, j, length + MTlength)
                            board[i  - length - MTlength][j] += board[i - length][j] //数值相加
                            board[i - length][j] = 0

                            score += (board[i - length - MTlength][j]) // 更新分数
                            updateScore(score)

                            hasConficted[i - length - MTlength][j] = true //将当前格记录为进行过叠加
                        }
                    }else if(board[i - length][j] != board[i - length - MTlength][j] && MTlength != 0){ //如果当前格与前一格值不等，且有记录叠加数
                        // console.log('3')
                        numberCellsMoveAnimationUp(i, j, length + MTlength)
                        board[i - length - MTlength][j] = board[i - length][j]
                        board[i - length][j] = 0
                    }
                    // console.log(j,board[i][j-length - MTlength])
                    for (let a = i + 1; a < 4; a++) { //遍历当前值之后的数字格
                        if (board[i - length - MTlength][j] == board[a][j] && board[a][j] !=0 
                            && !hasConficted[i - length - MTlength][j]) { //如果当前格与后面的数字格值相等，后面格不为0，且当前格没有进行过叠加
                            // console.log('4')
                            MergeTimes[j].push(i) //记录叠加数
                            break //停止循环，防止多次记录
                        }else if(board[i - length - MTlength][j] == board[a][j] && board[a][j] !=0){ //如果当前格与后面的数字格值相等，后面格不为0
                            MergeTimes[j].push(i)
                            break //停止循环，防止多次记录
                        }else if(board[i - length - MTlength][j] != board[a][j] && board[a][j] !=0){ //如果后面格有一个不相同的值，马上停止
                            break
                        }
                    }
                    if(i - length != i){ //如果该格进行过移动，消除移动前的数字格
                        board[i][j] = 0
                    }
                }
                if(i == 0){ //如果当前为第一格
                    for(let a = i+1;a < 4;a++){
                        if(board[i][j] != board[a][j] && board[a][j] != 0){ //如果当前格与后面格不相等，且都不为0，即不会发生叠加，停止记录叠加数
                            break
                        }else if(board[i][j] == board[a][j] && board[a][j] != 0){ //如果当前格与后面格相等。且都不为0，记录叠加数
                            MergeTimes[j].push(i)
                            break //停止循环，防止多次记录
                        }
                    }
                }
            }
        }
    }
    count = []
    MergeTimes = [] //重置计数器
    setTimeout("updateNumberCells()", 200) //延迟刷新
    return true //可以移动
}

function numberMoveDown() {
    if (!canMoveDown(board)) { //判断能否移动
        return false
    }
    let count = [] //记录空格数
    let MergeTimes = [] //记录可叠加数
    // 向左移动
    for (let j = 0; j < 4; j++) {

        count[j] = []
        MergeTimes[j] = []

        for (let i = 3; i >= 0; i--) { //遍历第一层
            let length = count[j].length
            let MTlength = MergeTimes[j].length
            if (board[i][j] == 0) { //如果有空格，记录
                count[j].push(board[i][j])
            }
            else if (board[i][j] != 0) { //如果不为空
                if (board[i][j] != 0 && i != 3) { //不为空且不在第一位
                    // console.log(i,MTlength,length)
                    numberCellsMoveAnimationDown(i, j, length) //向前移动空格数距离
                    board[i + length][j] = board[i][j] 
                    // console.log(j,board[i][j])
                    if (board[i + length][j] == board[i + length + MTlength][j] && MTlength != 0) { //如果当前格与前一格值相等，且有记录叠加数
                        if (hasConficted[i + length + MTlength][j]) { //如果前一格有进行过叠加，阻止新一次叠加
                            // console.log('1')
                            numberCellsMoveAnimationDown(i, j, length - MTlength + 1)
                            board[i + length + MTlength - 1][j] = board[i + length][j]
                            board[i + length][j] = 0
                        }else{ //前一值没有进行过叠加
                            // console.log('2')
                            numberCellsMoveAnimationDown(i, j, length + MTlength)
                            board[i + length + MTlength][j] += board[i + length][j] //数值相加
                            board[i + length][j] = 0

                            score += (board[i + length + MTlength][j]) // 更新分数
                            updateScore(score)

                            hasConficted[i + length + MTlength][j] = true //将当前格记录为进行过叠加
                        }
                    }else if(board[i + length][j] != board[i + length + MTlength][j] && MTlength != 0){ //如果当前格与前一格值不等，且有记录叠加数
                        // console.log('3')
                        numberCellsMoveAnimationDown(i, j, length + MTlength)
                        board[i + length + MTlength][j] = board[i + length][j]
                        board[i + length][j] = 0
                    }
                    // console.log(j,board[i][j-length - MTlength])
                    for (let a = i - 1; a >= 0; a--) { //遍历当前值之后的数字格
                        if (board[i + length + MTlength][j] == board[a][j] && board[a][j] !=0 
                            && !hasConficted[i + length + MTlength][j]) { //如果当前格与后面的数字格值相等，后面格不为0，且当前格没有进行过叠加
                            // console.log('4')
                            MergeTimes[j].push(i) //记录叠加数
                            break //停止循环，防止多次记录
                        }else if(board[i + length + MTlength][j] == board[a][j] && board[a][j] !=0){ //如果当前格与后面的数字格值相等，后面格不为0
                            // console.log('3')
                            MergeTimes[j].push(i)
                            break //停止循环，防止多次记录
                        }else if(board[i + length + MTlength][j] != board[a][j] && board[a][j] !=0){ //如果后面格有一个不相同的值，马上停止
                            break
                        }
                    }
                    if(i + length != i){ //如果该格进行过移动，消除移动前的数字格
                        board[i][j] = 0
                    }
                }
                if(i == 3){ //如果当前为第一格
                    for(let a = i-1 ;a >= 0;a--){
                        if(board[i][j] != board[a][j] && board[a][j] != 0){ //如果当前格与后面格不相等，且都不为0，即不会发生叠加，停止记录叠加数
                            break
                        }else if(board[i][j] == board[a][j] && board[a][j] != 0){ //如果当前格与后面格相等。且都不为0，记录叠加数
                            // console.log('5')
                            MergeTimes[j].push(i)
                            break //停止循环，防止多次记录
                        }
                    }
                }
            }
        }
    }
    count = []
    MergeTimes = [] //重置计数器
    setTimeout("updateNumberCells()", 200) //延迟刷新
    return true //可以移动
}

function canMoveLeft(board) { //判断是否能够移动
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
        }

    return false;
}

function canMoveRight(board)
{
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 2 ; j >= 0 ; j-- )
		{
			if(board[i][j] != 0)
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true ;
		}

	return false ;
}

function canMoveUp(board)
{
	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 1 ; i < 4 ; i++ )	
		{
			if(board[i][j] != 0)
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true ;
		}

	return false ;
}

function canMoveDown(board)
{
	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 2 ; i >= 0 ; i-- )
		{
			if(board[i][j] != 0)
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true ;
		}

	return false ;
}