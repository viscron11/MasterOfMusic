function setSource(source)
{
    let player = document.getElementById('music');
    player.setAttribute('src', source);
}
let player = document.getElementById('music');
let songs = document.getElementsByClassName("song");
let control = document.getElementById("control");
const tab = document.getElementsByClassName("song_length");
let song_length_string = [];
let song_length = [];
let timer = null;
let j = 0;
let lengthGlobal = 0;
let inside = document.getElementById("inside");
let outside = document.getElementById("outside");
let queue = [];
let currentSong = 0;
let end = false;
let clicks = 0;
let time = [];
let author = document.getElementsByClassName("song_author")[0].innerHTML;
   let song_titles = document.getElementsByClassName("song_title");

for(let i = 0; i < tab.length; i++)
{
    song_length_string.push(tab[i].innerHTML);
    
}

for(let i = 0; i < song_length_string.length; i++)
{
    let border = song_length_string[i].lastIndexOf(':');
    let minutes_str = song_length_string[i].substring(0, border);
    let minutes_int = parseInt(minutes_str);

    let seconds_str = song_length_string[i].substring(border+1, song_length_string[i].length);
    let seconds_int = parseInt(seconds_str);

    let time = (minutes_int * 60) + seconds_int;
    song_length.push(time);
}

for(let i = 0; i < songs.length; i++)
{
    let song_title = document.getElementsByClassName('song_title')[i].innerText;
    let source = `music/${song_title} (2015 Remaster).mp3`;
        source = source.split('');
        for(let j = 0; j < source.length; j++)
        {
            if(source[j] == ' ')
            {
                source[j] = '_';
            }
            
        }
        source = source.join("");
        
        queue.push(source);
}



for(let i = 0; i < songs.length; i++)
{
    song_title = document.getElementsByClassName('song_title')[i].innerText;
    
    
    songs[i].onclick = function()
    {
        clicks++;
        document.querySelector("footer").style.paddingTop = "0";
        currentSong = i;
        inside.style.width = "0";
        clearInterval(timer);
        player.setAttribute('src', queue[i]);
        for(let i = 0; i < song_length.length; i++) {
            console.log(queue[i]);
        }
        control.classList.remove("paused");
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "flex";
        control.classList.add("played");
        let songLength = song_length[i];
        let current_time = document.getElementById('current_time');
        lengthGlobal = songLength;
        j = 0;
        current_time.innerText = "0:00";
        let k = songLength;
        time = [];
        if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
        else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
        document.getElementById("current_length").innerText = time.join("");

        document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
            

            timer = setInterval(function () {
                j++;
                time = [];
                if(j-(60*Math.floor(j/60))>=10)time.push(`${Math.floor(j/60)}:${j-(60*Math.floor(j/60))}`);
                else time.push(`${Math.floor(j/60)}:0${j-(60*Math.floor(j/60))}`);
                time = time.join("");
                if(j<=Math.floor(player.duration))current_time.innerText = time;
                let width = (j / player.duration) * 600;
                if (width >= 600) {
                    end = true;
    
                    width = 600;
                }
                outside.style.borderRadius = "10px";
                inside.style.borderRadius = "10px";
                if (end == true) 
                {
                        current_time.innerText = "0:00";
                        end = false;
                        if(currentSong+1<songs.length)currentSong++;
                        else currentSong = 0;
                        player.setAttribute('src', queue[currentSong]);
                        player.play();
                        j = 0;
                        inside.style.width = "0";
                        time = [];
                        k = song_length[currentSong];
                        if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
                        else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
                        document.getElementById("current_length").innerText = time.join("");
                        document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
                         
                    
                    
                }
            }, 990)
        player.play();
    }
}



let songLength = player.duration;

function updateProgress(e) 
{
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    inside.style.width = `${progressPercent}%`;
}




function controlClick()
{
    if(control.classList.contains("paused"))
    {
        control.classList.remove("paused");
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "flex";
        control.classList.add("played");
        let songLength = lengthGlobal;
        timer = setInterval(function () {
            j++;
            time = [];
            if(j-(60*Math.floor(j/60))>=10)time.push(`${Math.floor(j/60)}:${j-(60*Math.floor(j/60))}`);
            else time.push(`${Math.floor(j/60)}:0${j-(60*Math.floor(j/60))}`);
            time = time.join("");
            if(j<=Math.floor(player.duration))current_time.innerText = time;
            let width = (j / player.duration) * 600;
            if (width >= 600) {
                end = true;

                width = 600;
            }
            outside.style.borderRadius = "10px";
            inside.style.borderRadius = "10px";
            if (end == true) 
            {
                    current_time.innerText = "0:00";
                    end = false;
                    if(currentSong+2<songs.length)currentSong++;
                    else currentSong = 0;
                    player.setAttribute('src', queue[currentSong]);
                    player.play();
                    j = 0;
                    inside.style.width = "0";
                    time = [];
                    k = song_length[currentSong];
                    if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
                    else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
                    document.getElementById("current_length").innerText = time.join("");
                
                
                
            }
        }, 990)
        player.play();
    }
    else
    {
        control.classList.remove("played");
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
        control.classList.add("paused");
        clearInterval(timer);
        player.pause();
    }
}

function setTime(e)
{
    const x = e.offsetX;
    const duration = player.duration;
    let newTime = (x/600) * duration;
    player.currentTime = newTime;
    let width = (newTime/duration)*600;
    j = Math.round(newTime);
    inside.style.width = `${width}px`;
    time = [];
    if(j-(60*Math.floor(j/60))>=10)time.push(`${Math.floor(j/60)}:${j-(60*Math.floor(j/60))}`);
    else time.push(`${Math.floor(j/60)}:0${j-(60*Math.floor(j/60))}`);
    time = time.join("");
    current_time.innerText = time;
}

outside.addEventListener("click", setTime);
player.addEventListener('timeupdate', updateProgress);

function nextSong()
{
    current_time.innerText = "0:00";
    end = false;
    if(currentSong<=songs.length)currentSong++;
    else currentSong = 0;
    player.setAttribute('src', queue[currentSong]);
    player.play();
    j = 0;
    inside.style.width = "0";
    time = [];
    k = song_length[currentSong];
    if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
    else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
    document.getElementById("current_length").innerText = time.join("");
    control.classList.remove("paused");
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "flex";
    control.classList.add("played");
    player.play();
    clearInterval(timer);
    document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
            

    timer = setInterval(function () {
        j++;
        time = [];
        if(j-(60*Math.floor(j/60))>=10)time.push(`${Math.floor(j/60)}:${j-(60*Math.floor(j/60))}`);
        else time.push(`${Math.floor(j/60)}:0${j-(60*Math.floor(j/60))}`);
        time = time.join("");
        if(j<Math.floor(player.duration))document.getElementById("current_time").innerText = time;
        let width = (j / player.duration) * 600;
        if (width >= 600 || j>=Math.floor(player.duration)) {
            end = true;

            width = 600;
        }
        outside.style.borderRadius = "10px";
        inside.style.borderRadius = "10px";
        if (end == true) 
        {
                current_time.innerText = "0:00";
                end = false;
                if(currentSong<=songs.length)currentSong++;
                else currentSong = 0;
                player.setAttribute('src', queue[currentSong]);
                console.log(queue[currentSong]);
                j = 0;
                inside.style.width = "0";
                time = [];
                k = song_length[currentSong];
                if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
                else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
                document.getElementById("current_length").innerText = time.join("");
                player.play();
                document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
            
        }
    }, 990)
}

function prevSong()
{
    current_time.innerText = "0:00";
    end = false;
    if(currentSong>0)currentSong--;
    else currentSong = songs.length - 1;
    player.setAttribute('src', queue[currentSong]);
    player.play();
    j = 0;
    inside.style.width = "0";
    time = [];
    k = song_length[currentSong];
    if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
    else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
    document.getElementById("current_length").innerText = time.join("");
    control.classList.remove("paused");
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "flex";
    control.classList.add("played");
    player.play();
    clearInterval(timer);
    document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
            

    timer = setInterval(function () {
        j++;
        time = [];
        if(j-(60*Math.floor(j/60))>=10)time.push(`${Math.floor(j/60)}:${j-(60*Math.floor(j/60))}`);
        else time.push(`${Math.floor(j/60)}:0${j-(60*Math.floor(j/60))}`);
        time = time.join("");
        if(j<Math.floor(player.duration))document.getElementById("current_time").innerText = time;
        let width = (j / player.duration) * 600;
        if (width >= 600 || j>=Math.floor(player.duration)) {
            end = true;

            width = 600;
        }
        outside.style.borderRadius = "10px";
        inside.style.borderRadius = "10px";
        if (end == true) 
        {
                current_time.innerText = "0:00";
                end = false;
                if(currentSong<=songs.length)currentSong++;
                else currentSong = 0;
                player.setAttribute('src', queue[currentSong]);
                console.log(queue[currentSong]);
                j = 0;
                inside.style.width = "0";
                time = [];
                k = song_length[currentSong];
                if(k-(60*Math.floor(k/60))>=10)time.push(`${Math.floor(k/60)}:${k-(60*Math.floor(k/60))}`);
                else time.push(`${Math.floor(k/60)}:0${k-(60*Math.floor(k/60))}`);
                document.getElementById("current_length").innerText = time.join("");
                player.play();
                document.getElementById("current_song_title").innerText = song_titles[currentSong].innerHTML;
            
        }
    }, 990)
}