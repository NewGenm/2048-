// 显示数字格
function showNumber(i,j,number) {
    let $numberCell = $('#number-Cell' + i + '-' + j + '')
    $numberCell.css({
        backgroundColor: getNumberBackgroundColor(number),
        color: 'black'
    }).text(number) //添加文字
    .animate({
        width: '100px',
        height: '100px',
        top: getPosTop(i) + 'px',
        left: getPosLeft(j) + 'px',
    },200)
}
// 创建表格方法
function numberCellsMoveAnimation(fromX,fromY,toX,toY) {
    let $numberCell = $('#number-Cell' + fromX + '-' + fromY + '')
    $numberCell.animate({
        top: getPosTop(toX) + 'px',
        left: getPosLeft(toY) + 'px'
    },200)
}

// 设置向左移动动画
function numberCellsMoveAnimationLeft(i,j,count) {
    let $numberCell = $('#number-Cell' + i + '-' + j + '')
    $numberCell.animate({
        left: getMoveLeft(j,count) + 'px'
    },200)
}

// 设置向右移动动画
function numberCellsMoveAnimationRight(i,j,count) {
    let $numberCell = $('#number-Cell' + i + '-' + j + '')
    $numberCell.animate({
        left: getMoveRight(j,count) + 'px'
    },200)
}

// 设置向上移动动画
function numberCellsMoveAnimationUp(i,j,count) {
    let $numberCell = $('#number-Cell' + i + '-' + j + '')
    $numberCell.animate({
        top: getMoveUp(i,count) + 'px'
    },200)
}

// 设置向下移动动画
function numberCellsMoveAnimationDown(i,j,count) {
    let $numberCell = $('#number-Cell' + i + '-' + j + '')
    $numberCell.animate({
        top: getMoveDown(i,count) + 'px'
    },200)
}