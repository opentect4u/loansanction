module.exports = {
    ABOUT_TYPE_LIST: [
        {id: "Society", name: "Society"},
        {id: "Membership", name: "Membership"},
        {id: "Loan", name: "Loan"},
    ],
    numberToWords: (number) => {
        return new Promise((resolve, reject) => {
            const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
            const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
            const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
            const thousands = ["", "Thousand", "Lakh", "Crore"];
        
            if (number === 0){
                resolve("Zero");
            }else{
                let words = "";
            
                function convert(n, index) {
                    if (n > 0) {
                        let str = "";
                        if (n > 19) {
                            str += tens[Math.floor(n / 10)] + " " + singleDigits[n % 10];
                        } else if (n > 9) {
                            str += teens[n - 10];
                        } else {
                            str += singleDigits[n];
                        }
                        words = str + (index > 0 ? " " + thousands[index] + " " : " ") + words;
                    }
                }
            
                let crore = Math.floor(number / 10000000);
                number %= 10000000;
                let lakh = Math.floor(number / 100000);
                number %= 100000;
                let thousand = Math.floor(number / 1000);
                number %= 1000;
                let hundred = Math.floor(number / 100);
                number %= 100;
            
                convert(crore, 3);
                convert(lakh, 2);
                convert(thousand, 1);
            
                if (hundred > 0) {
                    words = singleDigits[hundred] + " Hundred " + words;
                }
            
                if (number > 0) {
                    convert(number, 0);
                }
            
                resolve(words.trim())
            }
        
        })
    }
}