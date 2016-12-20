"use strict";

if (!process) {
    process = {}
    process.stdout = {}
    var pre = document.createElement('pre')
    document.body.appendChild('pre')
    process.stdout.file = pre
    process.stdout.write = function (msg) {
        this.file.innerHTML += msg
    }
}

function AssertError(msg) {
    var err = new Error(msg)
    err.name = 'AssertError'
    return err
}

function getCaller(nb, err=new Error()) {
    return err.stack.split('\n')[nb].match(/^ {4}at ([\w\$\.]+)/)[1]
}

class Testr {

    static run(cls) {
        var failNb = 0,
            fails = []
        Object.getOwnPropertyNames(cls.prototype).forEach(function (fn) {
            if (fn == 'constructor') return
            var fail = false
            try {
                cls.prototype[fn]()
            } catch (e) {
                fails.push(e)
                process.stdout.write('F')
                fail = true
                failNb ++
            }
            if (!fail) {
                process.stdout.write('.')
            }
        })
        console['log']('\n')
        if (failNb == 0) {
            console['log']('Success. Every single test passed!')
        } else {
            console['log'](`Oops... ${failNb} test${failNb > 1 ? 's' : ''} failed.\n`)
            fails.forEach(function (err) {
                console['error']('=>', err.toString())
            })
        }
    }

    assertEqual(val1, val2) {
        if (val1 != val2) {
            throw new AssertError(`Test "${getCaller(3)}" failded: ${val1} != ${val2}`)
        }
    }
    assertNotEqual(val1, val2) {
        if (val1 == val2) {
            throw new AssertError(`Test "${getCaller(3)}" failded: ${val1} == ${val2}`)
        }
    }

}

class ToTest extends Testr {

    firstTest() {
        this.assertNotEqual(1, 1)
    }
    secondTest() {
        this.assertEqual(1, 2)
    }
}

Testr.run(ToTest)
