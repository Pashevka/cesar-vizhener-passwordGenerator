
var CesarTab = document.getElementById("Cesar");
var VizhinerTab = document.getElementById("Vizhiner");
var GeneratorTab = document.getElementById("Generator");
var CesarArea = document.getElementById("Cesar-area");
var VizhinerArea = document.getElementById("Vizhener-area");
var GeneratorArea = document.getElementById("Generator-area");
var GenerateBtn = document.getElementById("generate");
var ClearBtn = document.getElementById("clear");
var CodeBtn = document.getElementById("code");
var DecodeBtn = document.getElementById("decode");
var VizhinerBtn = document.getElementById("Vizhener-code");
//document.getElementById("Cesar-input").addEventListener("keyup",function(e){
//    var arr_eng_big = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
//    var arr_symv = '~!@#$%^&*()_{}[]:";,./?<>-+№'.split("");
//    var tempLetter = document.getElementById("Cesar-input").value[document.getElementById("Cesar-input").value.length-1];
//    for(let i = 0; i < arr_eng_big.length; i++){
//        if (tempLetter == arr_eng_big[i])return;
//    }
//    for(let i = 0; i < arr_symv.length; i++){
//        if (tempLetter == arr_symv[i])return;
//    }
//    document.getElementById("Cesar-input").value = document.getElementById("Cesar-input").value.slice(0,-1);
//
//})

VizhinerBtn.addEventListener("click",function(){
    var CodePhrase = document.getElementById("Vizhener_count").value;
    var CodeSymv = document.getElementById("Vizhener_symv").checked;
    var VizhinerInput = document.getElementById("Vizhener-input").value;
    var VizhinerOutput = document.getElementById("Vizhener-output").value;
    var CodeNumb = document.getElementById("Vizhener_numb").checked;
      var Big = "abcdefghijklmnopqrstuvwxyz";
    Big = Big + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    Big = Big + "абвгдеёжзийклмнопрстуфхцчшщьыъэюя";
    Big = Big + "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ";
    Big = Big + "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ";
    Big = Big + "0123456789";
    var arrBig = Big.split("");
    console.log(GetBigMas(arrBig));
    for(let i = 0; i < VizhinerInput.length; i++ ){

    }
})

function GetBigMas(arr){
    var arrLength = arr.length+1;
    var cor = 0;
    var mas = [];
    for (var i = 0; i < arrLength; i++){
        mas[i] = [];
        for (var j = 0; j < arrLength; j++){
            if(j=0){
                
            }
            mas[i][j] = arr[j];
        }}
    return mas;

}
var cypher = (function () {
    var cypher = {}, register = function (e) {return e === e.toUpperCase();};
    cypher.language = {
        ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
        en : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        numbers : [0,1,2,3,4,5,6,7,8,9],
        symbols : "~!@#$%^&*()_+=-{};|\|/,.?><;:№ ".split(""),
        all     : [],
        joinAll : function (){
            cypher.language.all = [];
            for (var i in this) {
                if (typeof this[i] !== "function" && i !== "all") {
                    cypher.language.all = cypher.language.all.concat (this[i]);
                }
            }
        }
    }

    cypher.vizhener = {
        square : [],
        genSqViz : function (lang) {
            var l = cypher.language[lang];
            for (var i = 0; i < l.length; i++) {
                this.square[i] = l.slice(i).concat(l.slice(0, i));
            }
        },
        encryption : function (lang, text, key) {
            if (lang === "all") cypher.language.joinAll ();
            else if (!Array.isArray(cypher.language[lang])) return;
            this.genSqViz(lang);

            var sText = text;

            text = text.toUpperCase();
            key  = key.toUpperCase();

            var s = "", l = cypher.language[lang];
            for (var i = 0; i < text.length; i++) {
                s += this.square[l.indexOf(text[i])][l.indexOf(key[i])];
            }

            return s.split ("").map (function (e, i, a) {return register (sText[i]) ? e : e.toLowerCase();}).join("");
        },
        decryption : function (lang, key, cipher) {
            if (lang === "all") cypher.language.joinAll ();
            else if (!Array.isArray(cypher.language[lang])) return;
            this.genSqViz(lang);

            var sCipher = cipher;

            cipher = cipher.toUpperCase();
            key    = key.toUpperCase();
            var s = "",  l = cypher.language[lang];
            for (var i = 0; i < cipher.length; i++) {
                var row = l.indexOf(key[i])
                coll = this.square[row].indexOf(cipher[i]);
                s += l[coll];
            }
            return s.split ("").map (function (e, i, a) {return register (sCipher[i]) ? e : e.toLowerCase();}).join("");
        },
        outS : function () {
            for (var i = 0; i < this.square.length; i++) {
                document.write(this.square[i].join ("") + "<br>");
            }
        }
    };

    cypher.caesar = {
        encryption : function (lang, text, slip) {
            var l = cypher.language[lang], text = text.split(""), s = "";
            for (var i = 0; i < text.length; i++) {
                var index = l.indexOf (text[i]) + slip;
                if (index >= l.length) index -= l.length;
                s += l[index];
            }
            return s;
        },
        decryption : function (lang, cipher, slip) {
            var l = cypher.language[lang], cipher = cipher.split(""), s = "";
            for (var i = 0; i < cipher.length; i++) {
                var index = l.indexOf (cipher[i]) - slip;
                if (index < 0) index += l.length;
                s += l[index];
            }
            return s;
        }
    };
    return cypher;
} ());

console.log(cypher.vizhener.encryption ("en", "ATTACKATDAWN", "LEMONLEMONLE") + "<br>");
document.write (cypher.vizhener.decryption ("en", "LEMONLEMONLE", "LXFOPVEFRNHR") + "<br>");








function handleFileSelect(event){
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.readAsText(file);
    setTimeout(function(){document.getElementById("Cesar-input").value = reader.result},125);



}

document.getElementById("Timurik").addEventListener("change",handleFileSelect,false);
function GetRandom(min,max){
    return Math.floor(Math.random() * (max-min+1))+min;
}
function GetLetter(str){
    if(document.getElementById("generator_big").checked) {
        return str.toUpperCase();
    }else{
        if(document.getElementById("generator_different").checked){
            var temp_size = GetRandom(1,2);
            if(temp_size == 1){
                return str.toUpperCase();

            }else{
                return str;

            }
        }
    }
    return str;

}
CesarTab.addEventListener("click", function () {
    CesarArea.style.display = "flex";
    VizhinerArea.style.display = "none";
    GeneratorArea.style.display = "none";

})
VizhinerTab.addEventListener("click", function () {
    CesarArea.style.display = "none";
    VizhinerArea.style.display = "flex";
    GeneratorArea.style.display = "none";

})
GeneratorTab.addEventListener("click", function () {
    CesarArea.style.display = "none";
    VizhinerArea.style.display = "none";
    GeneratorArea.style.display = "block";

})
GenerateBtn.addEventListener("click", function(){
    var rus = document.getElementById("generator_rus").checked;
    var eng = document.getElementById("generator_eng").checked;
    var all = document.getElementById("generator_all").checked;
    var big = document.getElementById("generator_big").checked;
    var small = document.getElementById("generator_small").checked;
    var diff = document.getElementById("generator_different").checked;
    var row = document.getElementById("generator_row").checked;
    var stolb = document.getElementById("generator_stolb").checked;
    var count = document.getElementById("generator-count").value;
    var textarea = document.getElementById("password_export");
    var password_count = document.getElementById("generator-count-password").value;
    var symv = document.getElementById("generator_symv").checked;
    var numb = document.getElementById("generator_numb").checked;
    var export_arr = [];
    if (count < 1 || count > 41 || count%1!=0) {
        alert("Количество символов должно быть в промежутке от 1 до 40 и быть целым числом");
        return;
    }
    if (password_count < 1 || password_count > 1000 || password_count%1!=0) {
        alert("Количество паролей должно быть в промежутке от 1 до 1000  и быть целым числом");
        return;
    }
    var arr_eng = "a,b,c,d,e,f,g,h,i,g,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    var arr_rus = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ь,ы,ъ,э,ю,я".split(",");
    var arr_symv = '~!@#$%^&*()_{}[]:";,./?<>-+№'.split("");
    var arr_numb = "0123456789".split("");
    var all_spec = '~!@#$%^&*()_{}[]:";,./?<>-+№0123456789'.split("");
    //console.log(arr_eng);

    //console.log(arr_rus);
    var temp_str = "";
    for(let j = 0; j < password_count; j++) {
        for (let i = 0; i < count; i++) {
            var tempTestRand =GetRandom(1, 2);
            if(!symv && !numb) tempTestRand = 12;
            if(tempTestRand == 1 || tempTestRand == 12){
                if (all) {
                var temp_lang = GetRandom(1, 2);
                if (temp_lang == 1) {
                    temp_str = temp_str + GetLetter(arr_rus[GetRandom(0, arr_rus.length - 1)]);
                }
                else {
                    temp_str = temp_str + GetLetter(arr_eng[GetRandom(0, arr_eng.length - 1)]);
                }
            } else if (rus) {
                temp_str = temp_str + GetLetter(arr_rus[GetRandom(0, arr_rus.length - 1)]);
            } else {
                temp_str = temp_str + GetLetter(arr_eng[GetRandom(0, arr_eng.length - 1)]);

            }
        }else
            {
                if (symv && numb) {
                    temp_str = temp_str + GetLetter(all_spec[GetRandom(0, all_spec.length - 1)]);
                } else if (symv) {
                    temp_str = temp_str + GetLetter(arr_symv[GetRandom(0, arr_symv.length - 1)]);
                } else if (numb) {
                    temp_str = temp_str + GetLetter(arr_numb[GetRandom(0, arr_numb.length - 1)]);
                }
            }
        }

        export_arr[j] = temp_str;
        temp_str = "";
    }
    textarea.value = "";
    if (stolb) {
        for (let i = 0; i < password_count; i++) {
            textarea.value += export_arr[i] + "\n" + "\n";
        }
    }else
    {
        for (let i = 0; i < password_count; i++) {
            textarea.value += export_arr[i] + " , ";
        }
    }


})
ClearBtn.addEventListener("click", function () {
    document.getElementById("password_export").value = "";

})
function GetNumber(mas,count,j){
    var temp = j + count - mas;
    if (temp<mas){
    console.log(typeof temp)
    return temp;}
    else
    GetNumber(mas,temp,j);

}
function GetNextLetter(letter,mas,count,j){
    if(j+count>=mas.length){
        return mas[GetNumber(mas.length,count,j)]
    }else
    return mas[j+count]
}
CodeBtn.addEventListener("click", function () {
    var topArea = document.getElementById("Cesar-input").value;
    var bottomArea = document.getElementById("Cesar-output");
    var count = parseInt(document.getElementById("Cesar_count").value);
    bottomArea.value = "";
    var sumv = document.getElementById("Cesar_symv").checked;
    var numb = document.getElementById("Cesar_numb").checked;
    var arr_eng = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    var arr_eng_big = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
    var arr_rus = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ь,ы,ъ,э,ю,я".split(",");
    var arr_rus_big = "А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ь,Ы,Ъ,Э,Ю,Я".split(",");
    var arr_symv = '~!@#$%^&*()_{}[]:";,./?<>-+№'.split("");
    var arr_numb = "0123456789".split("");
    if(count<0 || count>10 || count%1!=0){
        alert("Число символов сдвига должно быть в промежутке от 0 до 10 и быть целым числом")
        return;
    }
    for(let i = 0; i < topArea.length; i++){
        var flag = 0;
        for(let j = 0; j < arr_eng.length; j++){
            if (topArea[i] == arr_eng[j]) {
                bottomArea.value = bottomArea.value + GetNextLetter(arr_eng[j], arr_eng, count,j);
                flag = 1;
            }else if(topArea[i] == arr_eng_big[j]){
                bottomArea.value = bottomArea.value + GetNextLetter(arr_eng_big[j], arr_eng_big, count,j)
                flag = 1;

            }
        }
        for(let j = 0; j < arr_rus.length; j++){
            if (topArea[i] == arr_rus[j]) {
                bottomArea.value = bottomArea.value + GetNextLetter(arr_rus[j], arr_rus, count,j)
                flag = 1;

            }else if(topArea[i] == arr_rus_big[j]){
                bottomArea.value = bottomArea.value + GetNextLetter(arr_rus_big[j], arr_rus_big, count,j)
                flag = 1;

            }
        }
        if(sumv) {
            for (let j = 0; j < arr_symv.length; j++) {
                if (topArea[i] == arr_symv[j]) {
                    bottomArea.value = bottomArea.value + GetNextLetter(arr_symv[j], arr_symv, count, j)
                    flag = 1;
                }
            }
        }
        if(numb) {
            for (let j = 0; j < arr_numb.length; j++) {
                if (topArea[i] == arr_numb[j]) {
                    bottomArea.value = bottomArea.value + GetNextLetter(arr_numb[j], arr_numb, count, j)
                    flag = 1;
                }
            }
        }
        if(flag == 0)
        bottomArea.value = bottomArea.value + topArea[i];



    }
    if(sumv&&numb){
        bottomArea.value = bottomArea.value + "11";

    }
    else if(sumv){
        bottomArea.value = bottomArea.value + "10";
    }
    else if(numb){
        bottomArea.value = bottomArea.value + "01";
    }else{
        bottomArea.value = bottomArea.value + "00";
    }
    document.getElementById("Cesar-input").value = "";



})

DecodeBtn.addEventListener("click",function(){
    var topArea = document.getElementById("Cesar-input");
    var bottomArea = document.getElementById("Cesar-output").value;
    var count = parseInt(document.getElementById("Cesar_count").value);
    bottomArea.value = "";
    var sumv = document.getElementById("Cesar_symv").checked;
    var numb = document.getElementById("Cesar_numb").checked;
    var arr_eng = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    var arr_eng_big = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
    var arr_rus = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ь,ы,ъ,э,ю,я".split(",");
    var arr_rus_big = "А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ь,Ы,Ъ,Э,Ю,Я".split(",");
    var arr_symv = '~!@#$%^&*()_{}[]:";,./?<>-+№'.split("");
    var arr_numb = "0123456789".split("");
    var decodeSymv = bottomArea[bottomArea.length-2];
    var decodeNumb = bottomArea[bottomArea.length-1];
    console.log(decodeSymv);
    console.log(decodeNumb);
    bottomArea = bottomArea.substring(0, bottomArea.length - 2);
    if(count<0 || count>10 || count%1!=0){
        alert("Число символов сдвига должно быть в промежутке от 0 до 40 и быть целым числом")
        return;
    }

    for(let i = 0; i < bottomArea.length; i++){
        flag = 0;
        for(let j = 0; j < arr_eng.length; j++){
            if (bottomArea[i] == arr_eng[j]) {
                topArea.value = topArea.value + GetNextLetter(arr_eng[j], arr_eng, arr_eng.length-count,j);
                flag = 1;
            }else if(bottomArea[i] == arr_eng_big[j]){
                topArea.value = topArea.value + GetNextLetter(arr_eng_big[j], arr_eng_big, arr_eng.length-count,j)
                flag = 1;

            }
        }
        for(let j = 0; j < arr_rus.length; j++){
            if (bottomArea[i] == arr_rus[j]) {
                topArea.value = topArea.value + GetNextLetter(arr_rus[j], arr_rus, arr_rus.length-count,j)
                flag = 1;

            }else if(bottomArea[i] == arr_rus_big[j]){
                topArea.value = topArea.value + GetNextLetter(arr_rus_big[j], arr_rus_big, arr_rus.length-count,j)
                flag = 1;

            }
        }
        if(sumv && decodeSymv==1) {
            for (let j = 0; j < arr_symv.length; j++) {
                if (bottomArea[i] == arr_symv[j]) {
                    topArea.value = topArea.value + GetNextLetter(arr_symv[j], arr_symv, arr_symv.length-count, j)
                    flag = 1;
                }
            }
        }
        if(numb && decodeNumb==1) {
            for (let j = 0; j < arr_numb.length; j++) {
                if (bottomArea[i] == arr_numb[j]) {
                    topArea.value = topArea.value + GetNextLetter(arr_numb[j], arr_numb, arr_numb.length-count, j)
                    flag = 1;
                }
            }
        }
        if(flag == 0)
            topArea.value = topArea.value + bottomArea[i];



    }
    document.getElementById("Cesar-output").value = "";
})

