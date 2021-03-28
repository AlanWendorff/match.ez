import {Howl, Howler} from 'howler';
import cmon from '../sounds/cmon.wav';
import gj from '../sounds/gj.wav';
import help from '../sounds/help.wav';
import im_coming from '../sounds/im_coming.wav';
import need_help from '../sounds/need_help.wav';
import wecando from '../sounds/wecando.wav';
import yes from '../sounds/yes.wav';

export const PlaySound = () => {
    const SOUNDCMON = new Howl({src: [cmon]});
    const SOUNDGJ = new Howl({src: [gj]});
    const SOUNDHELP = new Howl({src: [help]});
    const SOUNDIMCOMING = new Howl({src: [im_coming]});
    const SOUNDNEEDHELP = new Howl({src: [need_help]});
    const SOUNDWECANDO = new Howl({src: [wecando]});
    const SOUNDYES = new Howl({src: [yes]});

    Howler.volume(0.2);
    const RANDOMNUMBER = Math.floor(Math.random() * 7);
    
    if (JSON.parse(localStorage.getItem('sounds')) === true || JSON.parse(localStorage.getItem('sounds')) === null) {
        switch (RANDOMNUMBER) {
            case 0:
                SOUNDCMON.play();
            break;
    
            case 1:
                SOUNDGJ.play();
                break;
    
            case 2:
                SOUNDHELP.play();
                break;
    
            case 3:
                SOUNDIMCOMING.play();
                break;
    
            case 4:
                SOUNDNEEDHELP.play();
                break;
    
            case 5:
                SOUNDWECANDO.play();
                break;
    
            case 6:
                SOUNDYES.play();
                break;
            
            default:
                break;
        }
    }
}
