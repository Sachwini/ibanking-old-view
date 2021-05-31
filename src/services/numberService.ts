export function formatLakh(val: number, decimalPlace?: number) {
    if (!Number(val || 0)) return '';

    let roundDigit = decimalPlace ? decimalPlace : 2
    const splitted = val.toString().split('.')
    if (splitted[1] && splitted[1].length > 2 && !decimalPlace)
        roundDigit = 4;

    const initVal = Number(val || 0).toFixed(roundDigit);
    if (splitted[1])
        splitted[1] = initVal.split('.')[1];

    if (splitted[0].length <= 3) {
        if (Number(splitted[1] || 0)) {
            if(initVal)
            return addDigit(initVal);
        }
        return addDigit(splitted[0]);
    }

    var final = ''
    var counter = 1;
    for (let i = splitted[0].length; i >= 0; i--) {
        if (counter > 3 && (counter % 2 == 1))
            final = splitted[0].charAt(i) + ',' + final;
        else
            final = splitted[0].charAt(i) + final;
        counter++;
    }

    if (Number(splitted[1] || 0))
        final += '.' + splitted[1];

    if (final.charAt(0) === ',') final = final.substr(1);

    final = addDigit(final);

    return final;
}

function addDigit(final: string){
    if (!final.includes('.')) {
        return final + '.00';
    }

    if (final.includes('.')) {
        var len = final.split('.')[1].length
        if (len == 1)
            return final + '0'
        if (len == 0)
            return final + '00'
    }
    return final;
}

export function parseLakh(val: string) {
    val = val.toString();
    if (!val) return 0;

    var final = ''
    for (let i = 0; i < val.length; i++) {
        const char = val.charAt(i).trim();
        if (char === '.' || !isNaN(Number(char))) final += char;
    }

    return Number(final || 0);
}

export function convertToWords(amount: number) {
    amount = Math.floor(amount);
    var obStr = new String(amount);
    var numReversed = obStr.split("");
    var actnumber = numReversed.reverse();

    if (!Number(amount || 0)) {
        return ''
    }
    if (actnumber.length > 9) {
        return 'Oops!! too big number';
    }

    var iWords: any = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
    var ePlace: any = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
    var tensPlace: any = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

    var iWordsLength = numReversed.length;
    var totalWords = "";
    var inWords = new Array();
    var finalWord = "";
    var j: number = 0;
    for (let i = 0; i < iWordsLength; i++) {
        switch (i) {
            case 0:
                if (actnumber[i] === '0' || actnumber[i + 1] === '1') {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                inWords[j] = inWords[j] !== 'Zero' ? inWords[j] + ' Only' : '';
                break;
            case 1:
                tensComplication(i);
                break;
            case 2:
                if (actnumber[i] == '0') {
                    inWords[j] = '';
                }
                else if (actnumber[i - 1] != '0' && actnumber[i - 2] != '0') {
                    inWords[j] = iWords[actnumber[i]] + ' Hundred and';
                }
                else {
                    inWords[j] = iWords[actnumber[i]] + ' Hundred';
                }
                break;
            case 3:
                if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                if (actnumber[i + 1] != '0' || actnumber[i] > '0') {
                    inWords[j] = inWords[j] + " Thousand";
                }
                break;
            case 4:
                tensComplication(i);
                break;
            case 5:
                if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                if (actnumber[i + 1] != '0' || actnumber[i] > '0') {
                    inWords[j] = inWords[j] + " Lakh";
                }
                break;
            case 6:
                tensComplication(i);
                break;
            case 7:
                if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                    inWords[j] = '';
                }
                else {
                    inWords[j] = iWords[actnumber[i]];
                }
                inWords[j] = inWords[j] + " Crore";
                break;
            case 8:
                tensComplication(i);
                break;
            default:
                break;
        }
        j++;
    }

    function tensComplication(i: number) {
        if (actnumber[i] == '0') {
            inWords[j] = '';
        }
        else if (actnumber[i] == '1') {
            inWords[j] = ePlace[actnumber[i - 1]];
        }
        else {
            inWords[j] = tensPlace[actnumber[i]];
        }
    }
    inWords.reverse();
    for (let i = 0; i < inWords.length; i++) {
        finalWord += inWords[i];
    }
    return finalWord;
}
