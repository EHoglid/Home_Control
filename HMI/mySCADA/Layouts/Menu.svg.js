/* global myscada */

function init() {
// initialization code

}

function destroy() {
// view hide code

}

function periodic() {
// periodically triggering code
    if ( myscada.loggedUserLevel > 1)
    {
        myscada.setVisibleOn('btnControl');
        myscada.setVisibleOn('btnSettings');
        myscada.setVisibleOn('btnHelp');
        myscada.setVisibleOn('btnOther');
    }
    else
    {
        myscada.setVisibleOff('btnControl');
        myscada.setVisibleOff('btnSettings');
        myscada.setVisibleOff('btnHelp');
        myscada.setVisibleOff('btnOther');
    }

}