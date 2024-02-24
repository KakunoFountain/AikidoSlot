const url = new URL(window.location.href);

const head = ['', '', '', '', '', '', '', '', '', '', '座技', '半身半立ち']
const passive =     ['正面打ち', '横面打ち', '突き', 
                        '片手持ち', '交差持ち', '諸手持ち', 
                    '       両手持ち', '後ろ両手持ち', '肩取り', '後ろ両肩取り']
const active = ['一教抑え込み', '二教抑え込み', '三教抑え込み', '四教抑え込み', '五教抑え込み', 
                '小手返し', '入り身投げ', '天秤投げ', '隅落とし', '四方投げ表', '回転投げ表', '呼吸投げ', '呼吸法', 
                    '四方投げ裏', '回転投げ裏', '一教投げ', '二教投げ', '三教投げ', '太刀投げ', 
                    '大車輪', '腕絡み', '巻き込み入り身投げ', '両肩落とし', '腰投げ', 
                    '自由技']
const single = ['座技 呼吸法', '両手持ち 天地投げ表', 
                    '両手持ち 天地投げ裏', '諸手持ち 十字投げ', '両手持ち 十字投げ', '後ろ両手持ち 十字投げ', '後ろ両肩取り 十字投げ']

const head_inner = document.getElementById("head");
const passive_inner = document.getElementById("passive");
const active_inner = document.getElementById("active");


GetQueryParam();
ModelChange();


function GetQueryParam() {
    const param = url.searchParams.get('course');

    switch (param) {
        case 'beginner':
            document.getElementById("course").value = 'beginner';
            break;
        case 'firstexam':
            document.getElementById("course").value = 'firstexam';
            break;
        case 'expert':
            document.getElementById("course").value = 'expert';
            break;
    }

}

function Random(arr, size=arr.length) {
    return  Math.floor( Math.random() * size );
}

function ModelChange() {
    const course_val = document.getElementById("course").value;
    url.searchParams.set('course', course_val);
    history.replaceState('', '', url.href);

    //Random()の範囲決定
    let hed_size; let pasv_size; let actv_size; let sgl_size;
    switch(course_val) {
        case 'beginner':
            hed_size = 10; pasv_size = 6; actv_size = 13; sgl_size = 2;
            console.log('現在、初心者コース');
            break;
        case 'firstexam':
            hed_size = 10; pasv_size = 3; actv_size = active.length-1 - 5; sgl_size = -1;
            console.log('現在、初段審査コース');
            break;
        default:
            hed_size = head.length; pasv_size = passive.length; actv_size = active.length; sgl_size = single.length;
            console.log('現在、上級コース');
            break;
    }

    //乱数で指定した配列要素の取得結果を表示
    if (Math.floor( Math.random() * 25 ) % 25 == 0 && course_val !== "firstexam") {
        head_inner.innerHTML = '';
        passive_inner.innerHTML = '';
        active_inner.innerHTML = single[Random(single, sgl_size)];
        
    } else {
        head_inner.innerHTML = head[Random(head, hed_size)];
        passive_inner.innerHTML = passive[Random(passive, pasv_size)];

        switch(course_val) {
            case 'firstexam':
                active_inner.innerHTML = active[ Random(active, actv_size)+5 ];  //抑え込みを含まない 5~last-1の乱数
                break;
            default:
                active_inner.innerHTML = active[Random(active, actv_size)];
                break;
        }
    }
}

//初心者コースbeginner：head:~[9], passive:~[5], active:~[12], single:~[1]
//初段審査コースfirstexam：head:~[9], passive:~[2], active:[5]~[last-1], single:x
//上級コースexpert：全部