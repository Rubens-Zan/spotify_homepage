$(function(){
    
    let audioPlayer = document.getElementById('audioplayer');
    let loaded = false;

    let playBtn = document.getElementById('playBtn');
    let pauseBtn = document.getElementById('pauseBtn');


    pauseBtn.addEventListener('click',(e)=>{
        e.preventDefault();

        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
        audioPlayer.pause();
        return false;
    });


    playBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
        audioPlayer.play();
        return false;
    });

    const playSong = (file) => {

        if(loaded == false){
            audioPlayer.innerHTML = `<source src="`+file+`" type="audio/mp3" />`;
            loaded = true;
        }

        audioPlayer.load();

        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";

    }
    
    document.querySelectorAll('.main__col').forEach(item =>{

        item.addEventListener('click',event=>{
            let image = item.getAttribute('data-image');
            let artist = item.getAttribute('data-artist');
            let song = item.getAttribute('data-song');
            let file = item.getAttribute('data-file');


            let playerArtistComponent = document.getElementsByClassName('player__artist');

            playerArtistComponent[0].innerHTML = `
                <img src="`+image+`" />
                <h3>`+ song + `<br/><span>` + artist + `</span></h3>
            `;

            playSong(file);


            audioPlayer.onloadstart = () => {                
                alert(song +' - ' + artist);
                $('.listening').css('display', 'absolute');
            }

            audioPlayer.oncanplaythrough = function() {
                // alert("Can start playing song");
                audioPlayer.play();
            /* initProgressBar();*/
                isPlaying = true;
                /*alert(audioPlayer.duration);*/
            };
        })

    });

    audioPlayer.oncanplaythrough = function() {
        // alert("Can start playing song");
        audioPlayer.play();
    /* initProgressBar();*/
        isPlaying = true;
        /*alert(audioPlayer.duration);*/
    };

    //audioPlayer.play = function(){
        //alert('começou');
    //}


    // EVENT TO TIME UPDATE
    
    // EVENT TO MOUSE CONTROL
    let isDrag = false;
    $('.pointer').mousedown(function () {
        isDrag = true; 
    })

    $(document).mouseup(function () {
        isDrag = false;
    })
    audioPlayer.addEventListener('timeupdate', (e) => {
        // let progress_bar = document.getElementsByClassName('player__control__progress_2"');
        let currentTime = audioPlayer.currentTime;
        // console.log('Esse é o tempo atual: ',currentTime,'  segundos');
        // console.log('Essa é a porcentagem da barra :  ', ((currentTime / audioPlayer.duration) * 100), '%');
        
        currentValue =(currentTime / audioPlayer.duration) * 100;
        
        let elBase = $('.player__control__progress_2');
        let progress = elBase.width(); 
        if (progress < 0)
            progress = 0;
        if (progress > elBase.width())
            progress = elBase.width();
        // console.log(mouseX); 
        $('.pointer').css('left',  (progress-13)+ 'px');
        $('.player__control__progress_2').css('width', currentValue + '%');       
    });
    

    $('.player__control__progress').mousemove(function (e) {
        if (isDrag) {
            let elBase = $(this);
            let mouseX = e.pageX - elBase.offset().left;
            if (mouseX < 0)
                mouseX = 0;
            if (mouseX > elBase.width())
                mouseX = elBase.width();
            
            $('.pointer').css('left', (mouseX-13) + 'px');
            currentValue = (mouseX / elBase.width()) * 100;
            audioPlayer.currentTime = currentValue; 
            $('.player__control__progress_2').css('width', currentValue + '%');
            console.log(audioPlayer.currentTime); 

        } 
    })

});