// This is not complete yet, There are still more functions to be implemented and tweaking some more logic

function isNumber(value) {
    return !isNaN(value) && !isNaN(parseInt(value));
}

function parseData(statements) {
    console.log(statements);
    let data = statements.split('\n'); 
    console.log(data); 
    let word = [];
    for(let i = 0; i < data.length; i++) {
        if(data[i][0] === ';' || data[i] === '') {
            continue;
        }
        else{
        word.push(data[i]);
        }
    }
    return word;
}
var program = `; My first program
mov  a, 5
inc  a
call function
msg  '(5+1)/2 = ', a    ; output message
end

function:
    div  a, 2
    ret`
    parseData(program)


const Collections = (globalData, data, dictionary)=>
{
    function mov(data)
    {
        const [item1, item2, item3] = data
        if(!(item2 in dictionary)){
            if(isNumber(item3))
            {
                dictionary[item2] = Number(item3)
            }
            else{
                dictionary[item2] = dictionary[item3]
            }
        }
        else
        {
            if(isNumber(item3))
            {
                dictionary[item2] = Number(item3)
            }
            else{
                dictionary[item2] = dictionary[item3]
            }
        }
        return dictionary

    }
    function inc(data)
    {
        dictionary[data[1]]+=1
        return dictionary
    }
    function dec(data)
    {
        dictionary[data[1]]-=1
        return dictionary
    }
    function add(value)
    {
        const [item1, item2, item3] = value
        if(isNumber(item3))
        {
            dictionary[item2] += Number(item3)
        }
        else{
            dictionary[item2] += Number(dictionary[item3])
        }
        return dictionary
    }
    function subtract(value)
    {
        const [item1, item2, item3] = value
        if(isNumber(item3))
            {
                dictionary[item2] -= Number(item3)
            }
            else{
                dictionary[item2] -= Number(dictionary[item3])
            }
            return dictionary
    }
    function multiply(value)
    {
        const [item1, item2, item3] = value
        if(isNumber(item3))
            {
                dictionary[item2] *= Number(item3)
            }
            else{
                dictionary[item2] *= Number(dictionary[item3])
            }
            return dictionary
    }
    function divide(value)
    {
        const [item1, item2, item3] = value
        if(isNumber(item3) && item3 !== '0')
            {
                dictionary[item2] /= Number(item3)
            }
            else{
                if(Number(dictionary[item3]) !== 0){
                dictionary[item2] /= Number(dictionary[item3])
                }
                else{
                    console.log("Cannot divide by zero")
                }
            }
            return dictionary
    }
    function jmpLabel(data)
    {

        const [name, lbl] = data.split(' ')
        let currentindex = globalData.indexOf(name)
        let jumpto = lbl+':'

        let index = globalData.indexOf(jumpto)
        let i = index
        while(globalData[index] !== 'ret')
        {
            i+=1
        }
        let retIndex = i

        return (index, retIndex)

    }
    function ret(data)
    {
        index = data.indexOf('ret')

    }
    function msg(data)
    {

    }
    function cmp(data)
    {
        const [item1, item2, item3] = data
        if(item2 in dictionary && item3 in dictionary)
        {
            if(dictionary[item2] !== dictionary[item3])
            {
                return 1
            }
            else if (dictionary[item2] === dictionary[item3])
            {
                return 2
            }
            else if(dictionary[item2] >= dictionary[item3])
            {
                return 3
            }
            else if(dictionary[item2] > dictionary[item3])
            {
                return 4
            }
            else if(dictionary[item2] <= dictionary[item3])
            {
                return 5
            }
            else if(dictionary[item2] < dictionary[item3])
            {
                return 6;
            }
            else{
                return 1000
            }
        }
        else{
            return 1000
        }

    }
    function allJumpingfunctions(data)
    {
        let val = cmp(data)
        function jmp()
        {
            jmpLabel(data)
        }
        function je()
        {
            jmpLabel(data)
        }
        function jne()
        {
            jmpLabel(data)
        }
        function jge()
        {
            jmpLabel(data)
        }
        function jg()
        {
            jmpLabel(data)
        }
        function jle()
        {
            jmpLabel(data)
        }
        function jl()
        {
            jmpLabel(data)
        }
        switch(val)
        {
            case val === 1:
                return jmp()
                break;
            case val === 2:
                return je()
                break;
            case val === 3:
                return jne()
                break;
            case val === 4:
                return jge()
                break;
            case val === 5:
                return jg()
                break;
            case val === 6:
                return jle()
                break;
            case val === 7:
                return jl()
                break;
            default:
                console.log("Invalid instruction")
                break;
        }
    }
    return {
        mov, inc, dec, add, subtract, multiply, divide, allJumpingfunctions
    };

}
function Assembler(program)
{
   let dictionary = {}
   date = parseData(program)
   let i = 0
  
   while(i != 'end')
   {
    let instruction = data[i].split(' ')
    if(instruction[0] === 'end')
    {
        break;
    }
    switch(instruction[0])
    {
        case 'mov':
            Collections(data, dictionary).mov(instruction)
            break;
        case 'inc':
            Collections(data, dictionary).inc(instruction)
            break;
        case 'dec':
            Collections(data, dictionary).dec(instruction)
            break;
        case 'add':
            Collections(data, dictionary).add(instruction)
            break;
        case 'subtract':
            Collections(data, dictionary).subtract(instruction)
            break;
        case 'multiply':
            Collections(data, dictionary).multiply(instruction)
            break;
        case 'divide':
            Collections(data, dictionary).divide(instruction)
            break;
        case 'jmp':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'je':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'jne':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'jge':
            i =  Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'jg':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'jle':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'jl':
            i = Collections(data, dictionary).allJumpingfunctions(instruction)
            break;
        case 'ret':
                Collections(data, dictionary).ret(instruction)
                break;
        default:
            console.log("Invalid instruction")
            break;

    }  
    i+=1
}

}
