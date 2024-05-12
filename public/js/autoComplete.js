let availableKeywords = [
    'Wrangell, AK 	USA 	(WRG)',
'Wroclaw	Poland	(WRO)',
'Wuhan	China	(WUH)',
'Xi an	China	(XIY)',
'Xiamen	China	(XMN)',
'Xichang	China	(XIC)',
'Yakima, WA 	USA 	(YKM)',
'Yakutat, AK 	USA 	(YAK)',
'Yamagata	Japan	(GAJ)',
'Yangyang, Korea	Republic of	(YNY)',
'Yanji	China	(YNJ)',
'Yantai	China	(YNT)  ',
'Yaounde	Cameroon	(NSI)',
'Yaounde	Cameroon	(YAO)',
'Yap	Micronesia	(YAP)',
'Yellowknife, NWT	Canada	(YZF)',
'Yellowknife, NWT	Canada 	(YZF)',
'Yerevan	Armenia	(EVN)',
'Yogyakarta, Java	Indonesia	(JOG)',
'Yuma, AZ 	USA 	(YUM)',
'Zacatecas	Mexico	(ZCL)',
'Zadar	Croatia	(ZAD)',
'Zagreb	Croatia	(ZAG)',
'Zamboanga	Philippines	(ZAM)',
'Zanzibar	Tanzania	(ZNZ)',
'Zaragoza	Spain	(ZAZ)',
'Zhengzhou	China	(CGO)',
'Zhoushan	China	(HSN)',
'Zurich	Switzerland	(ZRH)'

];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;

    if(input.length){
        result = availableKeywords.filter((keyword) => {
           return keyword.toLowerCase().includes(input.toLowerCase());
        
        });
        console.log(result);
    }
    display(result);

    if(!result.length){
        resultsBox.innerHTML = '';
    }
}

function display(result){
    const content = result.map((list) =>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}