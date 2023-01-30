input.onButtonPressed(Button.A, function () {
    serial.writeString("" + ("123\n"))
})
input.onButtonPressed(Button.AB, function () {
    pauN += 1
    if (pauN % 2 == 1) {
        serial.writeString("p:1")
        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            `)
    } else {
        serial.writeString("p:0")
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
let pauN = 0
serial.redirectToUSB()
// 重新定向到USB
serial.setBaudRate(BaudRate.BaudRate115200)
// （设置频率）
input.setAccelerometerRange(AcceleratorRange.OneG)
let lrDim = input.acceleration(Dimension.X)
// 左右变量
let thrDim = input.acceleration(Dimension.Y)
// 推力变量


basic.forever(function () {
    // 方向判断变化
    while (Math.abs(lrDim) > 1 || Math.abs(thrDim) > 1) {
        if (Math.abs(lrDim) > Math.abs(thrDim)) {
            if (lrDim > 0) {
                // x>0
                serial.writeString("")
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
            } else {
                // x<0
                serial.writeString("")
                basic.showLeds(`
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    `)
            }
        } else {
            if (thrDim < 0) {
                // y<0
                serial.writeString("")
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
            } else {
                // y>0
                serial.writeString("")
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
            }
        }
    }
})
