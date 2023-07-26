__projectID="521661";

try{
__tables="";
} catch(err){}
try{
__tablesNew=[];
} catch(err){}
try{
__connectionsTypes={"Arduino_Primo":6,"X-Logic":6,"Arduino":6,"script":11,"PhilipsHue":6};
} catch(err){}
try{
__alarmMessages={};
__alarmArea={};
__alarmDevice={};
__alarmSeverity={};
} catch(err){}
__datalogs={};
__aggregatedDlgs={"data":{}};



__mySCADAConfig = {'dbglev':0,'tcp':1,'fcgi':1,'pFolder':'/visudata/public','rowLimit':500000,'transTime':1,'read_checkperiod':20,'log_port':11014,'read_tPort':11012,'read_fPort':'11013','stact_fPort':'11011','stack_tPort':'11010','binFolder':'/visudata/bin','wwwFolder':'/www','hmiFolder':'/etc/hmi','http_port':80,'https_port':443,'userFtp':0,'userFtpDir':'/Data/LiteData/user','scriptInfoPort':11015,'scriptCmdPort':11016,'modemCmdPort':11017,'os':''};

__mySCADAConfig.os="WINDOWS";
__mySCADAConfig.binFolder="C:\Users\Erik Hoglid\.mySCADA\myPROJECTDesigner7\binary\win32";

//zmena

/*function list
 * deleteUserData()
 * usedSpaceUserDataFolder()
 * freeSpaceUserDataFolder()
 * readAlarmsStatus(sev,callback)
 * readActiveAlarms(sev,callback)
 * writeTag(tag,callback)
 * writeTable(rq,callback)
 * readActiveAlarmsForReports(sev,format,callback)
 * histoDlgTags(datalogname,start,end,tags,limit,callback)
 * histoDlgCreatePictureForPens(datalogname,start,end,filename,keys,limit,w,h,format,callback)
 * histoDlgCreatePictureForPensWithNames(datalogname,start,end,filename,names,keys,limit,w,h,format,callback)
 * histoDlgCreatePicture(datalogname,start,end,filename,limit,w,h,format,callback)
 * histoDlg(datalogname,start,end,limit,callback)
 * histoDlgRaw(datalogname,start,end,limit,callback)
 * histoDlgForReport(datalogname,start,end,limit,format,callback)
 * histoDlgForReportWithTags(datalogname,start,end,tagslist,limit,format,callback)
 * histoDlgForReportNoRounding(datalogname,start,end,limit,format,callback)
 * histoDlgForReportRounded(datalogname,start,end,limit,format,decimalplaces,callback)
 * histoDlgCSV(filename,datalogname,format,start,end,limit,callback)
 * histoDlgAppendCSV(filename,datalogname,format,start,end,limit,callback)
 * histoDlgTagsCSV(filename,datalogname,format,start,end,tags,limit,callback)
 * histoDlgTagsAppendCSV(filename,datalogname,format,start,end,tags,limit,callback)
 * logFile(stringtext)
 * logFileClear()
 * requireIncludes(name)
 * getFilenameIncludes(filename)
 * getFilename(filename)
 * getFilePathUserScripts(filename)
 * getFilePathUserData(filename)
 * getFilenameUserFiles(filename)
 * histoAlarms(start,end,limit,callback)
 * histoAlarmsForReport(start,end,limit,format,callback)
 * histoAlarmsOccurenceForReport(start,end,limitRes,limit,callback)
 * histoAlarmsAppendCSV(file,format,start,end,limit,callback)
 * histoAlarmsCSV(file,format,start,end,limit,callback)
 * ping(__host,callback)
 * sendSMS(number,text)
 * getStringFromArray(values)
 * getArrayFromString(__string)
 * readTable(table,callback)
 * createReport(reportTemplate,callback)
 * createReportSync(reportTemplate)
 * generateReport(doc,reportName)
 * sendMail(filename, filenamepath, mailsubject, mailtext, mailto, cc, host, secure, auth, port, user, pass, from, usedevice)
 * sendMailJson(filename, filenamepath, mailsubject, mailtext, config)
 * insertDlg(_datalogname,_time,_timems,_pole,callback)
 * keepAliveDlg()
 */

//fix pro starsi node.js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
//end fix

exports.__projectID=__projectID;
__mySCADADebugOutput="C:/Users/Erik Hoglid/UserDir";
__mySCADADebugUserFiles="H:/Documents/mySCADA/X-Logic/Scripts/UserFiles";
__mySCADADebugIncludes="H:/Documents/mySCADA/X-Logic/Scripts/Includes";
__hostname="";
__location="";

if (__mySCADAConfig.os=="LINUX") {__gnuplot=__mySCADAConfig.binFolder+"/ext/gnuplot/gnuplot";}
if (__mySCADAConfig.os=="APPLE") {__gnuplot=__mySCADAConfig.binFolder+"/ext/gnuplot/gnuplot";}
if (__mySCADAConfig.os=="BOX") {__gnuplot="gnuplot";}
if (__mySCADAConfig.os=="WINDOWS") {__gnuplot="\""+__mySCADAConfig.binFolder+"/ext/gnuplot/gnuplot.exe\"";} 
if (__mySCADAConfig.os=="RASPI") {__gnuplot="gnuplot";} 



var __splitOnce = function(str, delim) {
    var components = str.split(delim);
    var result = [components.shift()];
    if(components.length) {
        result.push(components.join(delim));
    }
    return result;
};

function __getLocation()
{
  fs = require('fs')
  fs.exists('/etc/spel/histosql/locations.cfg',function(exists){
      if (exists) {
      fs.readFile('/etc/spel/histosql/locations.cfg', 'utf8', function (err,data) {
          if (err) {console.log(err);}
              var array = data.toString().split("\n");
              for(i in array) {
                      if (array[i].indexOf("LOCATION")>-1) {var location_arr=__splitOnce(array[i],' '); __location=location_arr[1];}
                      if (array[i].indexOf("HOSTNAME")>-1) {var hostname_arr=__splitOnce(array[i],' '); __hostname=hostname_arr[1];}
                  }
                  exports.location=__location;
                  exports.hostname=__hostname;
      });
      }
  });
} 

function run()
{
/* kazdych 10s nacte hostname,location  - kdyz se to zmeni z www*/	
__getLocation(); //aby nacet hned
setInterval(function(){	
	__getLocation();	
},10000);	

__dataj={};
__convertlist = {};
__listenerList = {};
__locklist = {writelock: {}, writerqlock: {}, readlock: {}, alarmlock:{active:{lock:0,timelock:0},status:{lock:0,timelock:0}},histoalarmlock:{lock:0,time:0},histolock:{lock:0,time:0}};
__myevent = new (require('events').EventEmitter);
__buffer="";
__buffer_hist="";
__buffer_modemmaster="";
__debug_main=0;
__exit=0;
sms_list=[];
exports.sms_list=sms_list;
__sms_array_max_length=10;
__sms_last_timestamp=0;
modem_connect=1;
exports.modem_connect=modem_connect;


myStatus={alarmstatus:{active: 0,ackonwledged: 0}}
myActiveAlarmList=NaN;

	net = require('net');

/* Socket Stack */	

/*
	var HOST = '127.0.0.1';
	//var HOST = '192.168.13.20';
	var PORT = 11010;

	connect=1;
        
        
	client = new net.Socket({allowHalfOpen: false});
	client.setNoDelay(true);


	client.connect(PORT, HOST, function() {
		log('CONNECT');
		client.setNoDelay(true);
		connect=1;
	});

	client.on('data', function(data_tcp) {
		client.pause();
		log('~~~~~~~~~~~~~~~~~~~~>RCV stack: '+data_tcp);
		__buffer+=data_tcp;
		var data_parse=__buffer.toString('utf-8').split("\n");
		for (var i=0;i<=data_parse.length-1;i++) {
			try {
				var data2=data_parse[i];
				var response=JSON.parse(data2);
				var pomlist=Object.keys(response);
				trqc=pomlist[0];
				if (response['r']=="12") {
					log('Emit: r12');
					__myevent.emit("r12",data2);
				}
				if (response['r']=="2") {
					log('Emit: r2');
					__myevent.emit("r2",data2);
				}
				if (response['r']=="0") {
					log('Emit: r0');
					//console.log(data2);
					__myevent.emit(__listenerList[trqc],data2);
				}
				if (response['r']=="1") {
					log('Emit: r1');
					__myevent.emit("r1",data2);
				}
				if (response['r']=="10") {
					log('Emit: r10');
					__myevent.emit("r10",data2);
				}
				__buffer='';
			}  catch (e) {
				//__buffer+=data2;
				//__buffer+='\n';
				};
		}
		client.resume();
	});

	client.on('close', function() {
		connect=0;
		client.destroy();
		log('CLOSE');
		try {client.removeAllListeners('connect')} catch (e) {console.log(e);};
		setTimeout(function() {
			client.connect(PORT, HOST, function() {
				log(" Reconnected after close");
				connect=1;

			});
		},1000);
	});

	client.on('error', function(err) {
		log(" Reconnected after error");
		connect=0;
		console.log(err);
	});

	client.on('connect_failed', function () {
		log(" Reconnected after failed");
		connect=0;
	  	log("FAILED");
	});
    
    */

/* Socket historead */

/*
	var __HOST = '127.0.0.1';
	//var __HOST = '192.168.13.20';
	var __PORT = 11012;
	
	connect_hist=0;
	client_hist = new net.Socket({allowHalfOpen: false});
	client_hist.setNoDelay(true);


	client_hist.connect(__PORT, __HOST, function() {
		log('CONNECT HIST');
		client_hist.setNoDelay(true);
		connect_hist=1;
	});

    client_hist.on('data', function(data_tcp_hist) {
        client_hist.pause();
        //log('~~~~~~~~~~~~~~~~~~~~>RCV stack: '+data_tcp_hist);
        __buffer_hist+=data_tcp_hist;
        if (data_tcp_hist.toString('utf-8').match(/\n/)!=null) {
        //for (var i=0;i<=data_parse.length-1;i++) {
          try {
              //console.log("Nalezen konec radku");
              //console.log("---->"+__buffer_hist);
              var data_parse=__buffer_hist.toString('utf-8').split("\n");
              var data2=data_parse[0];
              var response=JSON.parse(data2);
              var pomlist=Object.keys(response);
              trqc=pomlist[0];
              __buffer_hist='';
              __prubeh=0;
              if (response['r']=="31") {
                  log('Emit: r31');
                  __myevent.emit("r31",data2);
              }
              if (response['r']=="30") {
                  log('Emit: r30');
                  __myevent.emit("r30",data2);
              }
          }  catch (e) {
              //__buffer_hist+=data2;
              //__buffer_hist+='\n';
          };
        //}
        } else {}
        client_hist.resume();
    });

	client_hist.on('close', function() {
		connect_hist=0;
		client_hist.destroy();
		log('CLOSE');
		try {client_hist.removeAllListeners('connect')} catch (e) {console.log(e);};
		setTimeout(function() {
			client_hist.connect(__PORT, __HOST, function() {
				log(" Reconnected after close");
				connect_hist=1;

			});
		},1000);
	});

	client_hist.on('error', function(err) {
		log(" Reconnected after error");
		connect_hist=0;
		console.log(err);
	});

	client_hist.on('connect_failed', function () {
		log(" Reconnected after failed");
		connect_hist=0;
	  	log("FAILED");
	});
*/
/* Socket histolog */

	var __HOST_HISTOLOG = '127.0.0.1';
	//var __HOST_HISTOLOG = '192.168.55.136';
	if (__mySCADAConfig.os=="WINDOWS") {var __PORT_HISTOLOG = 11022;} else {var __PORT_HISTOLOG = 11014;}
	
	connect_log=0;
	client_log = new net.Socket({allowHalfOpen: false});
	client_log.setNoDelay(true);
	//client_log.setKeepAlive(true,1000);


	client_log.connect(__PORT_HISTOLOG, __HOST_HISTOLOG, function() {
		log('CONNECT LOG');
		client_log.setNoDelay(true);
		connect_log=1;
	});

	client_log.on('data', function(data_tcp_hist) {
	});

	client_log.on('close', function() {
		connect_log=0;
		client_log.destroy();
		log('CLOSE');
		try {client_log.removeAllListeners('connect')} catch (e) {console.log(e);};
		setTimeout(function() {
			client_log.connect(__PORT_HISTOLOG, __HOST_HISTOLOG, function() {
				log(" Reconnected after close");
				connect_log=1;

			});
		},1000);
	});

	client_log.on('error', function(err) {
		log(" Reconnected after error");
		connect_log=0;
		console.log(err);
	});

	client_log.on('connect_failed', function () {
		log(" Reconnected after failed");
		connect_log=0;
	  	log("FAILED");
	});	

/* Socket modemMaster */

	var __HOST_MODEMMASTER = '127.0.0.1';
	var __PORT_MODEMMASTER = 11017;
	
	connect_modemmaster=0;
	client_modemmaster = new net.Socket({allowHalfOpen: false});
	client_modemmaster.setNoDelay(true);


	client_modemmaster.connect(__PORT_MODEMMASTER, __HOST_MODEMMASTER, function() {
		log('CONNECT MODEMMASTER');
		client_modemmaster.setNoDelay(true);
		connect_modemmaster=1;
		connect_modemmaster=1;
	});

    client_modemmaster.on('data', function(data_tcp_modemmaster) {
        client_modemmaster.pause();
        //console.log('~~~~~~~~~~~~~~~~~~~~>RCV from modemmaster: '+data_tcp_modemmaster);
        __buffer_modemmaster+=data_tcp_modemmaster;
        if (data_tcp_modemmaster.toString('utf-8').match(/\n/)!=null) {
          try {
              var data_parse=__buffer_modemmaster.toString('utf-8').split("\n");
              //console.log("Nalezen konec radku");
              //console.log("---->"+__buffer_modemmaster);
              var data_parse=__buffer_modemmaster.toString('utf-8').split("\n");
              var data2=data_parse[0];
              var response=JSON.parse(data2);
              var pomlist=Object.keys(response);
              trqc=pomlist[0];
              __buffer_modemmaster='';
              __prubeh=0;
              if (response['r']=="54") {
                  log('Emit: r54');
                  __myevent.emit("r54",data2);
              }              
              } catch (e) {};
        } else {}
        client_modemmaster.resume();
    });

	client_modemmaster.on('close', function() {
		connect_modemmaster=0;
		if (modem_connect==1) {
			client_modemmaster.destroy();
			log('CLOSE MODEMMASTER');
			try {client_modemmaster.removeAllListeners('connect')} catch (e) {console.log(e);};
			setTimeout(function() {
				client_modemmaster.connect(__PORT_MODEMMASTER, __HOST_MODEMMASTER, function() {
					log(" Reconnected MODEMMASTER after close");
					connect_modemmaster=1;

				});
			},1000);
		}
	});

	client_modemmaster.on('error', function(err) {
			log(" Reconnected MODEMMASTER after error");
			connect_modemmaster=0;
			console.log(err);
	});

	client_modemmaster.on('connect_failed', function () {	
			log(" Reconnected MODEMMASTER after failed");
			connect_modemmaster=0;
			log("FAILED MODEMMASTER");
	});	

/* UNLOCK TIMER */
setInterval(function(){
	var delay=30;
	var delay_histo=300;
	log("******************UNLOCKER*******************");
	var unixtimestamp = Math.round(+new Date()/1000); 
	log("Actual timestamp: "+unixtimestamp);
	try {
		var pomlist=Object.keys(__locklist.readlock);
		for (var i=0;i<pomlist.length;i++) {
			if (__locklist.readlock[pomlist[i]]['lock']==1) {
				var unlocktime=parseInt(__locklist.readlock[pomlist[i]]['time'])+delay;
				log("Unlocked ReadOnce: "+unlocktime);
				if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
					__locklist.readlock[pomlist[i]]['lock']=0;
					log("Unlocked ReadlockOncelist PLC now");
				}
			}
		}
	} catch (e) {log("READ_ONCE - Error Unlock !!!!!");};
	try {
		var pomlist=Object.keys(__locklist.writelock);
		for (var i=0;i<pomlist.length;i++) {
			if (__locklist.writelock[pomlist[i]]['lock']==1) {
				var unlocktime=parseInt(__locklist.writelock[pomlist[i]]['time'])+delay;
				log("Unlocked Write: "+unlocktime);
				if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
					__locklist.writelock[pomlist[i]]['lock']=0;
					log("Unlocked Write PLC now");
				}
			}
		}
	} catch (e) {log("WRITE - Error Unlock !!!!!");};
	try {
		var pomlist=Object.keys(__locklist.writerqlock);
		for (var i=0;i<pomlist.length;i++) {
			if (__locklist.writerqlock[pomlist[i]]['lock']==1) {
				var unlocktime=parseInt(__locklist.writerqlock[pomlist[i]]['time'])+delay;
				log("Unlocked WriteTable: "+unlocktime);
				if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
					__locklist.writerqlock[pomlist[i]]['lock']=0;
					log("Unlocked WriteTable PLC now");
				}
			}
		}
	} catch (e) {log("WRITETABLE - Error Unlock !!!!!");};
	try {
		if (__locklist.alarmlock['status']['lock']==1) {
			var unlocktime=parseInt(__locklist.alarmlock['status']['time'])+delay;
			log("Unlocked AlarmStatus: "+unlocktime);
			if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
				__locklist.alarmlock['status']['lock']=0;
				log("Unlocked Alarm status now");
			}
		}
	} catch (e) {log("ALARMSTATUS - Error Unlock !!!!!");};
	try {
		if (__locklist.alarmlock['active']['lock']==1) {
			var unlocktime=parseInt(__locklist.alarmlock['active']['time'])+delay;
			log("Unlocked ActiveAlarms: "+unlocktime);
			if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
				__locklist.alarmlock['active']['lock']=0;
				log("Unlocked Alarm active now");
			}
		}
	} catch (e) {log("ALARMACTIVE - Error Unlock !!!!!");};
	try {	
		if (__locklist.alarmhistlock['lock']==1) {
			var unlocktime=parseInt(__locklist.alarmhistlock['time'])+delay;
			log("Unlocked Alarm History: "+unlocktime);
			if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
				__locklist.alarmhistlock['lock']=0;
				log("Unlocked Alarm History now");
			}
		}
	} catch (e) {log("ALARMHISTORY?? - Error Unlock !!!!!");};
	try {	
		if (__locklist.histolock['lock']==1) {
			var unlocktime=parseInt(__locklist.histolock['time'])+delay_histo;
			log("Unlocked History: "+unlocktime);
			if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
				__locklist.histolock['lock']=0;
				try {__myevent.removeAllListeners('r31')} catch (e) {log(e);};
				//__myevent.emit("r31","{\"r\":31,\"s\":0}");
				log("Unlocked History now");
			}
		}
	} catch (e) {log("HISTORY - Error Unlock !!!!!");};
	try {	
		if (__locklist.histoalarmlock['lock']==1) {
			var unlocktime=parseInt(__locklist.histoalarmlock['time'])+delay_histo;
			log("Unlocked Alarm History: "+unlocktime);
			if (parseInt(unlocktime) < parseInt(unixtimestamp)) {
				__locklist.histoalarmlock['lock']=0;
				try {__myevent.removeAllListeners('r31')} catch (e) {log(e);};
				//__myevent.emit("r31","{\"r\":31,\"s\":0}");
				log("Unlocked Alarm History now");
			}
		}
	} catch (e) {log("ALARMHISTORY - Error Unlock !!!!!");};	
	try {
		log("ReadLockList: ");
		log(__locklist.readlock);
		log("WriteLockList: ");
		log(__locklist.writelock);
		log("AlarmLockList: ");
		log(__locklist.alarmlock);
		log("WriteRqLockList: ");
		log(__locklist.writerqlock);
		log("Alarmhistlist: ");
		log(__locklist.histoalarmlock);
		log("HistLock: ");
		log(__locklist.histolock);
	} catch (e) {};
		log("*************************************");
	
},5000);

}
exports.run=run;

/* MAIN STACK */

var fs = require('fs');
//var sys = require('sys')
var exec = require('child_process').exec;

fs.removeRecursive = function(path,cb){
    var self = this;

    fs.stat(path, function(err, stats) {
      if(err){
        cb(err,stats);
        return;
      }
      if(stats.isFile()){
        fs.unlink(path, function(err) {
          if(err) {
            cb(err,null);
          }else{
            cb(null,true);
          }
          return;
        });
      }else if(stats.isDirectory()){
        fs.readdir(path, function(err, files) {
          if(err){
            cb(err,null);
            return;
          }
          var f_length = files.length;
          var f_delete_index = 0;

          var checkStatus = function(){
            if(f_length===f_delete_index){
              fs.rmdir(path, function(err) {
                if(err){
                  cb(err,null);
                }else{
                  cb(null,true);
                }
              });
              return true;
            }
            return false;
          };
          if(!checkStatus()){
            for(var i=0;i<f_length;i++){
              (function(){
                var filePath = path + '/' + files[i];
                fs.removeRecursive(filePath,function removeRecursiveCB(err,status){
                  if(!err){
                    f_delete_index ++;
                    checkStatus();
                  }else{
                    cb(err,null);
                    return;
                  }
                });

              })()
            }
          }
        });
      }
    });
  };

function deleteUserData() {
    var fname=myscada.getFilename("");
    fs.removeRecursive(fname,function(err,status){});
}

exports.deleteUserData=deleteUserData;

function usedSpaceUserDataFolder()
{
        try {
            var fs = require('fs');
            var file = '/media/ram/free_sd_space.json';
            data=fs.readFileSync(file);
            var data = JSON.parse(data);
            return data.user_used_MB;
        } catch (e) {console.log(e);}
}

function freeSpaceUserDataFolder()
{
        try {
            var fs = require('fs');
            var file = '/media/ram/free_sd_space.json';
            data=fs.readFileSync(file);
            var data = JSON.parse(data);
            var free=data.user_avail_MB-data.user_used_MB;
            if (free<0) {free=0;}
            return free;
        } catch (e) {console.log(e);}
}

exports.usedSpaceUserDataFolder=usedSpaceUserDataFolder;
exports.freeSpaceUserDataFolder=freeSpaceUserDataFolder; 

//function initMe(){
    
//}
//exports.initMe=initMe;

function init(isSettings) {
    
    process.on('uncaughtException', function (err) {
        console.log("ERROR:"+err);
        
      });

        if (isSettings)
        {
        __http_server.listen(8889, "127.0.0.1");
        }
        else
        {
        __http_server.listen(8888, "127.0.0.1");
        }

    if (__mySCADAConfig.os==='iOS') {
        console.log("INIT FOR IOS!");
        //initMe();
        //console.log("INIT ME");
        var xx=process.argv+"";
       // console.log("XX:"+xx);
        var args=xx.split(",");
        for (var i=0;i<args.length;i++) {
            var p=args[i];
                 //  console.log(i+": "+p);
            if (p.startsWith("--controlfh=")) {
                var controlFileHandler=p.substring(12);
                console.log("Control Handle File:"+controlFileHandler);
                if (controlFileHandler) {
                    var readline = require('readline');
                    // Accept control messages coming from a file descriptor.
                    controlFileHandler = parseInt(controlFileHandler);
                    var rlControl = readline.createInterface(fs.createReadStream('', {
                        fd: controlFileHandler
                    }));
                    rlControl.on('line', function (line) {
                        line = line.toString();
                        if (line.match(/^QUIT/)) {
                            console.log("Quitting Node...");
                            //process.exit();
                            process.exitCode = 1;
                        } else if (line.startsWith("{")) {
                            console.log('View Scripts Request...');
                            try {
                                var result=JSON.parse(line);
                                if (this.dataFromViewScripts!==undefined) {
                                    this.dataFromViewScripts(result,function(navrat) {});
                                }
                            }
                            catch (e){}
                        } else {
                            console.error('unknown control command: ${line}');
                        }
                    }.bind(this));
                }
            }
        }
    }
    else {
        run();
        initTable();
    
        //every 5s read SMS from modemMaster
        setInterval(function(){
                //if (modem_connect==1) {
            _readSMS();
                //}
        },5000);
    }
}
exports.init=init;

function initTable() {
	if (typeof __tables=='undefined' || typeof __projectID=='undefined' ) {return(0)};
	var poledata=__dataj;
	var pom_data_js = {};
	var trq=__tables.toString('utf-8').split("^");
	for (var i=0;i<trq.length;i++) {
		var tagg=trq[i].toString('utf-8').split("'");
		var trqID=tagg[0];
		var trqAlias=tagg[1];
		var plcname=tagg[2];
		var conId=tagg[2];
		var unixtimestamp = Math.round(+new Date()/1000);
		__convertlist[trqID]={alias:trqAlias,plcname:plcname};
		__convertlist[trqAlias]={alias:trqID,plcname:plcname};
		__locklist.writelock[conId]={lock: 0,time:unixtimestamp};
		__locklist.writerqlock[trqID]={lock: 0,time:unixtimestamp};
		__locklist.readlock[trqID]={lock: 0,time:unixtimestamp};		
		__listenerList[trqID]={listener: NaN};
		try{
			var tags=tagg[3].toString('utf-8').split(";");
			for (var x=0;x<tags.length;x++) {
				var tagc=tags[x].toString('utf-8').split("|");
//				pom_data_js[tagc[0]]={trqalias: trqAlias,tag: tagc[1],plc: conId, count: tagc[2], value: null, values: null, status: null, type: tagc[3], fullname: tagc[1]+"@"+conId};
				pom_data_js[tagc[0]]={trqalias: trqAlias,tag: tagc[1],plc: conId, count: tagc[2], value: null, values: null, status: null, type: tagc[3], fullname: tagc[1]};
			}
			poledata[trqAlias]=pom_data_js;
			pom_data_js ={};
			__createVariable(__dataj);
		}  catch (e) { /* console.log(e); */ }
	}
	log(__dataj);
}
exports.initTable=initTable;

function __getTagList(pole,trq) {
	var trqlist=[];
	var pomlist=Object.keys(pole[__convertlist[trq]['alias']]);
	var pomlist2 =[];
	for (var i=0;i<pomlist.length;i++) {
		pomlist2=pomlist[i].toString('utf-8').split("|");
		trqlist[i]=pomlist2[0];
	}
	return trqlist;
}

function __createVariable(__pole) {
	var pomlist=Object.keys(__pole);
	log(pomlist);
	for (var z=0;z<pomlist.length;z++) {
		eval(pomlist[z]+"=__pole[pomlist[z]];");
//		pomlist[z]=pole[pomlist[z]];
	}
}

function listTable(table) {
	try {
		var tagaliaslist=Object.keys(__dataj[table]);		
		for (var z=0;z<tagaliaslist.length;z++) {
				console.log(table+"."+tagaliaslist[z]+".value" + "\t = \t "+ eval(table+"."+tagaliaslist[z]+".value")); 
				console.log(table+"."+tagaliaslist[z]+".values" + "\t = \t "+ eval(table+"."+tagaliaslist[z]+".values")); 
				console.log(table+"."+tagaliaslist[z]+".status" + "\t = \t "+ eval(table+"."+tagaliaslist[z]+".status")); 
		}
		console.log("");
	} catch (e) { /* console.log(e); */ }
}
exports.listTable=listTable;

/**
 * Function will return numbers of active alarms and number of acknowledged alarms.
 * @param {type} sev alarm severity
 * @param {type} callback will be supplied with status of read (1 = read successful, 0 = read error) and with data object as second parameter
 * @returns {undefined}
 */
function readAlarmsStatus(sev,callback) {
	 {
		if (__locklist.alarmlock['status']['lock']==0) {	
			// zamek __locklist.alarmlock['status']['lock']=1;
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.alarmlock['status']['time']=unixtimestamp;
			var data='t=12&prj='+__projectID+'&sev='+sev+'\3';
			var start = Math.round(+new Date());
			__getRequest(false,data,function (err,data){
                                    if (!err)
                                    {
					var stop=Math.round(+new Date())-start;
					log('Time AlarmStatus - r12: '+stop+' ms');
					var object_return=JSON.parse(data);
					//myStatus['alarmstatus'].active=object_return['act'];
					//myStatus['alarmstatus'].ackonwledged=object_return['ack'];
					//alarmStatus=myStatus['alarmstatus'];
					
                                        var retval=new Object();
                                        retval.active=object_return['act'];
                                        retval.ack=object_return['ack'];
                                        
                                        //try {__myevent.removeAllListeners('r12')} catch (e) {console.log(e);};
					//__locklist.alarmlock['status']['lock']=0;
					if (object_return['s']==0) {var status=0;} else {var status=1;}	
					callback(status,retval);
					return;
                                    }
			});
		}
   	 }	
}
exports.readAlarmsStatus=readAlarmsStatus;

function readTableOnce(table,callback) {
    {
        try {
                plcname=__convertlist[table]['plcname'];
                var trqc=__convertlist[table]['alias'];
//                if (__locklist.readlock[trqc]['lock']==0) {
//                    __locklist.readlock[trqc]['lock']=1;  //nutno pro blokovani zapisu
//                    var unixtimestamp = Math.round(+new Date()/1000);
//  __locklist.readlock[trqc]['time']=unixtimestamp;
                    var trqc=__convertlist[table]['alias'];
                    var data='t=0&rq='+trqc+'&prj='+__projectID+'\3';
                    log(data);
                    var start = Math.round(+new Date());
                   // __listenerList[trqc]= Math.floor((Math.random()*10000000)+1);
                    __getRequest(false,data,function (err,data){
                            if (!err)
                            {
                        var stop=Math.round(+new Date())-start;
                        log('Time readTable - r5: '+stop+' ms');
                        log('Read DATA rcv: ' + data);
                        var object_return=JSON.parse(data);
                        var pomlist=Object.keys(object_return);

                        trqc=pomlist[0];
                        plcname=__convertlist[trqc]['plcname'];
                        var taglist=__getTagList(__dataj,trqc);
                        for (var z=0;z<taglist.length;z++) {
                            if (object_return[trqc]['s']!=0) {
                                try {
                                  if (object_return[trqc]['ts'][z]==1) {
__dataj[__convertlist[trqc]['alias']][taglist[z]]['status']=object_return[trqc]['ts'][z];
                                  } else {
                                      callback(0);
                                      return;

                                  }
                                }
                                catch (e) {
                                    if (object_return[trqc]['t'][z]!='') {
 __dataj[__convertlist[trqc]['alias']][taglist[z]]['status']=1;
 __dataj[__convertlist[trqc]['alias']][taglist[z]]['value']=object_return[trqc]['t'][z][0];
 __dataj[__convertlist[trqc]['alias']][taglist[z]]['values']=object_return[trqc]['t'][z];
                                    }
                                }
                            } else    {
//  __locklist.readlock[trqc]['lock']=0;
                                callback(0);
                                return;
                            }
                        }

                        __createVariable(__dataj);
//                        __locklist.readlock[trqc]['lock']=0;
                        callback(1);
                        return;
                    }
                    });
//                } else {callback(0);return;}
            }    catch (e) {console.log(e);}
    } 
}

/**
 * Function will read all currently active alarms.
 * @param {type} sev will filter out all active alarms with severity lower than value of supplied parameter
 * @param {type} callback will be supplied with status of read (1 – read successful, 0 - read error) and list of active alarms as data object
 * @returns {undefined}
 */
function readActiveAlarms(sev,callback) {
	 {	
		if (__locklist.alarmlock['active']['lock']==0) {
			// zamek __locklist.alarmlock['active']['lock']=1;
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.alarmlock['active']['time']=unixtimestamp;
			var data='t=10&prj='+__projectID+'&sev='+sev+'\3';
			var start = Math.round(+new Date());
			__getRequest(false,data,function (err,data){
                                    if (!err)
                                    {
				var stop=Math.round(+new Date())-start;
				log('Time ActiveAlams - r10: '+stop+' ms');
				//try {__myevent.removeAllListeners('r10')} catch (e) {console.log(e);};
				myActiveAlarmList=JSON.parse(data);
				__locklist.alarmlock['active']['lock']=0;
				if (myActiveAlarmList['s']==0) {var status=0;} else {var status=1;}
                                
                                var datax=myActiveAlarmList['d'];
                                
                                var returnval= new Array();
                                for (var i=0;i<datax.length;i++) {
                                        var retval=new Object();
                                        retval.id=datax[i]['id'];
                                       // var cell=Object.keys(datax[pomlist[i]]['cell'])
                                        //console.log(datax[pomlist[i]]['cell']);
                                        var datepom=datax[i]['cell']['atm'];
                                        var tmstr=datepom[0]+","+datepom[1];
                                        retval.atm=getDateFromTM(tmstr);
                                        datepom=datax[i]['cell']['dtm'];
                                        tmstr=datepom[0]+","+datepom[1];
                                        retval.dtm=getDateFromTM(tmstr);
                                        datepom=datax[i]['cell']['acktm'];
                                        tmstr=datepom[0]+","+datepom[1];;
                                        retval.acktm=getDateFromTM(tmstr);
                                        
                                        retval.msg=datax[i]['cell']['msg'];
                                        retval.area=datax[i]['cell']['area'];
                                        retval.dev=datax[i]['cell']['dev'];
                                        retval.stat=datax[i]['cell']['stat'];
                                        retval.sv=datax[i]['cell']['sv'];
                                        retval.val=datax[i]['cell']['v'];
                                        retval.acktval=datax[i]['cell']['av'];
                                        retval.deactval=datax[i]['cell']['dv'];
                                        returnval.push(retval);
                                }
				callback(status,returnval);
				return;
                                
				//callback(status,myActiveAlarmList['d']);
                            }
			});
		} else {callback(0);return;}
	} 
}
exports.readActiveAlarms=readActiveAlarms;

function listActiveAlarms(data) {
	log('++++++LIST ACTIVE ALARMS++++++ ');
	for (var z=0;z<data.length;z++) {
			var myAlarm=data[z];
			log(data[z]['id']+','+myAlarm['cell']['msg']+','+myAlarm['cell']['area']+','+myAlarm['cell']['dev']+','+myAlarm['cell']['stat']+','+myAlarm['cell']['sv']
			+','+myAlarm['cell']['atm']+','+myAlarm['cell']['dtm']+','+myAlarm['cell']['acktm']+','+myAlarm['cell']['v']+','+myAlarm['cell']['av']+','+myAlarm['cell']['dv']
			+','+myAlarm['cell']['ak']);
		}
	log('++++++LIST ACTIVE ALARMS END++++++ ');
	log('');
}
exports.listActiveAlarms=listActiveAlarms;

/**
 * Function will write single tag.
 * @param {type} tag must be already defined in one of the tables in „PLC Variables Tables“ or in “Script Variables Tables”
 * @param {type} callback will be supplied with status of write (1 – write successful, 0- write error)
 * @returns {Number|undefined}
 */
function writeTag(tag,callback) {
	 {
			var pomocna=tag.toString('utf-8').split(".");
			var trqlist=pomocna[0];
			var tagalias=pomocna[1]
			try {var fullname=__dataj[trqlist][tagalias]['fullname'];var count=__dataj[trqlist][tagalias]['count'];var plcname=__dataj[trqlist][tagalias]['plc'];} catch (e) {};
			writestring="t=1&prj="+__projectID+"&do="+fullname+"|";

			if (count==1) {
				writestring+=count+"|";
				eval("var value = "+trqlist+"."+tagalias+".value");
				writestring+=value;
				} 
				else {
					writestring+=count+"|";
					eval("var values = "+trqlist+"."+tagalias+".values");
					if (count != values.length) {console.log("ERR(1): Count mismatch variables"); return 1;}
					for (var i=0;i<count;i++)
					{
						writestring+=values[i];
						if (i<count-1) writestring+="|";
					}
				}
				writestring+='\3';
				if (__locklist.writelock[plcname]['lock']==0) {
					// zamek __locklist.writelock[plcname]['lock']=1;
					var unixtimestamp = Math.round(+new Date()/1000); 
					__locklist.writelock[plcname]['time']=unixtimestamp;
					log(writestring);
					var start = Math.round(+new Date());
					__getRequest(false,writestring,function (err,data){
                                                        if (!err)
                                                        {
							var stop=Math.round(+new Date())-start;
							log('Time writeTag - r1: '+stop+' ms');
							//console.log('Write DATA rcv: ' + data);
							var dataj=JSON.parse(data);
							if (dataj['s']==0) {var status=0;} else {var status=1;}			
							try {__myevent.removeAllListeners('r1')} catch (e) {console.log(e);};
							__locklist.writelock[plcname]['lock']=0;
							callback(status);
							return;
                                                    } else {callback(0);}
					});
				} else {callback(0);return;}
	} 
}
exports.writeTag=writeTag;

/**
 * Function will write all tags, defined in a table which is supplied as first function parameter.
 * Only tags with value(s) different from null will be written.
 * @param {type} rq
 * @param {type} callback will be supplied with status of write (1 – write successful, 0- write error)
 * @returns {undefined}
 */
function writeTable(rq,callback) {
	 {
		log('WriteRq');
		var writestring="";
		var trqnumber=__convertlist[rq]['alias'];
			if (__locklist.writerqlock[trqnumber]['lock']==0) {
			eval("var trqc=__dataj."+rq);
					
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.writerqlock[trqnumber]['time']=unixtimestamp;
			// zamek __locklist.writerqlock[trqnumber]['lock']=1;
			writestring="t=2&rq="+trqnumber+"&prj="+__projectID+"&val=";
			var pomlist=Object.keys(trqc);
			for (var i=0;i!=pomlist.length;i++) {
				var alias=pomlist[i];
				var count=trqc[pomlist[i]]['count'];
				if (count==1) {
					eval('var value='+rq+'.'+alias+'.value');
				} else {
					eval('var value='+rq+'.'+alias+'.values.join(\'|\')');
				}
				if (value==null) {value=' ';}
				writestring+=value;
				if (i<pomlist.length-1) {writestring+=";";}
			}
			log("Writestring :"+writestring);
			writestring+='\3';
			
			var start = Math.round(+new Date());
			__getRequest(false,writestring,function (err,data){
                                    if (!err)
                                    {
				var stop=Math.round(+new Date())-start;
				log('Time writeTag - r1: '+stop+' ms');
				var dataj=JSON.parse(data);
				if (dataj['s']==0) {var status=0;} else {var status=1;}			
				try {__myevent.removeAllListeners('r2')} catch (e) {console.log(e);};
				__locklist.writerqlock[trqnumber]['lock']=0;
				callback(status);
				return;
                            }else {callback(0);}
			});
		}else {callback(0);return;}
	} 
}
exports.writeTable=writeTable;

/* GENERAL FUNCTIONS */
function getFromatedDateFromTM(tm,format)
{
    
    var moment = require('moment');
    var scas=tm+"";
    var rescas = scas.split(',');
    var casissec=parseInt(rescas[0]);
    var casisusec=parseInt(rescas[1]);
    var cast=casissec*1000+casisusec/1000;
    var casint=Math.floor(cast);
    var casje=moment(casint);
    
 
    return casje.format(format);
}

function getFromatedDateFromTMUTC(tm,format)
{
    var moment = require('moment');
    var scas=tm+"";
    var rescas = scas.split(',');
    var casissec=parseInt(rescas[0]);
    var casisusec=parseInt(rescas[1]);
    var cast=casissec*1000+casisusec/1000;
    var casint=Math.floor(cast);
    var casje=moment.utc(casint);
    return casje.format(format);
}

function getDateFromTM(tm)
{
   // var moment = require('moment');
    var scas=tm+"";
    var rescas = scas.split(',');
    var casissec=parseInt(rescas[0]);
    var casisusec=parseInt(rescas[1]);
    var cast=casissec*1000+casisusec/1000;
    var casint=Math.floor(cast);
    var casje=new Date(casint);
    return casje;
}

/* MAIN HISTO */

function __printCSVData(data) {
	console.log("Printing CSV Data:");
	var radekcount=0;
	var radek="";
	datax=data;//JSON.parse(data);
	//datax=datax['d'];
	var pomlist=Object.keys(datax)
	for (var i=0;i<pomlist.length;i++) {
		for (var x=0;x<datax[pomlist[i]]['d'].length;x++) {
			var pomlist2=Object.keys(datax[pomlist[i]]['d'][x])
			radek+=datax[pomlist[i]]['d'][x]['tm'][0]+":"+datax[pomlist[i]]['d'][x]['tm'][1]+";";
			for (var z=0;z<pomlist2.length;z++) {
				if ([pomlist2[z]]!="tm") {
					radek+=datax[pomlist[i]]['d'][x][pomlist2[z]];
					if (z<pomlist2.length-2) {radek+=";";}
				}
			}
		console.log(radek);
		radekcount++;
		radek="";
		}
	}
	console.log("Pocet Radku:"+radekcount	);
}

function __printCSVAlarms(data) {
	console.log("Printing CSV Alarms:");
	console.log("atm;dtm;acktm;id;msg;area;dev;stat;sv;atm;dtm;acktm;v;av;dv");
	var radekcount=0;
	var radek="";
	datax=data;
	var pomlist=Object.keys(datax)
	for (var i=0;i<pomlist.length;i++) {
		var id=datax[pomlist[i]]['id'];
		var cell=Object.keys(datax[pomlist[i]]['cell'])
		//console.log(datax[pomlist[i]]['cell']);
		radek=datax[pomlist[i]]['cell']['atm']+";";
		radek+=datax[pomlist[i]]['cell']['dtm']+";";
		radek+=datax[pomlist[i]]['cell']['acktm']+";";
		radek+=id+";";
		radek+=datax[pomlist[i]]['cell']['msg']+";";
		radek+=datax[pomlist[i]]['cell']['area']+";";
		radek+=datax[pomlist[i]]['cell']['dev']+";";
		radek+=datax[pomlist[i]]['cell']['stat']+";";
		radek+=datax[pomlist[i]]['cell']['sv']+";";
		radek+=datax[pomlist[i]]['cell']['v']+";";
		radek+=datax[pomlist[i]]['cell']['av']+";";
		radek+=datax[pomlist[i]]['cell']['dv'];
		//radek+=datax[pomlist[i]]['cell']['ak']+";";
		console.log(radek);
		radekcount++;
	}
	console.log("Pocet Radku:"+radekcount	);
}

/**
 * Function will read all currently active alarms and format then for direct use with MS Word Template Report.
 * Active alarms are saved in the data object structure you will receive in a callback function.
 * @param {type} sev filter out all active alarms with severity lower than value of supplied parameter
 * @param {type} format is used to custom format date
 * @param {type} callback will be supplied with status of read (1 – read successful, 0 - read error) and list of active alarms as data object.
 * @returns {undefined}
 */
function readActiveAlarmsForReports(sev,format,callback) {
	 {	
		if (__locklist.alarmlock['active']['lock']==0) {
			// zamek __locklist.alarmlock['active']['lock']=1;
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.alarmlock['active']['time']=unixtimestamp;
			var data='t=10&prj='+__projectID+'&sev='+sev+'\3';
			var start = Math.round(+new Date());
			__getRequest(false,data,function (err,data){
                                    if (!err)
                                    {
				var stop=Math.round(+new Date())-start;
				log('Time ActiveAlams - r10: '+stop+' ms');
				try {__myevent.removeAllListeners('r10')} catch (e) {console.log(e);};
				myActiveAlarmList=JSON.parse(data);
				__locklist.alarmlock['active']['lock']=0;
                                
                                var status=1;
				if (myActiveAlarmList['s']==0) {status=0;} else {status=1;}
                                var datax=myActiveAlarmList['d'];
                                
                                var returnval= new Array();
                                for (var i=0;i<datax.length;i++) {
                                        var retval=new Object();
                                        retval.id=datax[i]['id'];
                                       // var cell=Object.keys(datax[pomlist[i]]['cell'])
                                        //console.log(datax[pomlist[i]]['cell']);
                                        var datepom=datax[i]['cell']['atm'];
                                        var tmstr=datepom[0]+","+datepom[1];
                                        retval.atm=getFromatedDateFromTM(tmstr,format);
                                        datepom=datax[i]['cell']['dtm'];
                                        tmstr=datepom[0]+","+datepom[1];
                                        retval.dtm=getFromatedDateFromTM(tmstr,format);
                                        datepom=datax[i]['cell']['acktm'];
                                        tmstr=datepom[0]+","+datepom[1];;
                                        retval.acktm=getFromatedDateFromTM(tmstr,format);
                                        
                                        retval.msg=datax[i]['cell']['msg'];
                                        retval.area=datax[i]['cell']['area'];
                                        retval.dev=datax[i]['cell']['dev'];
                                        retval.stat=datax[i]['cell']['stat'];
                                        retval.sv=datax[i]['cell']['sv'];
                                        retval.val=datax[i]['cell']['v'];
                                        retval.acktval=datax[i]['cell']['av'];
                                        retval.deactval=datax[i]['cell']['dv'];
                                        returnval.push(retval);
                                }
				callback(status,returnval);
				return;
                            }
                            else{callback(0);}
			});
		}
	}
}
exports.readActiveAlarmsForReports=readActiveAlarmsForReports;

function __printCSVAlarms(data) {
	console.log("Printing CSV Alarms:");
	console.log("atm;dtm;acktm;id;msg;area;dev;stat;sv;atm;dtm;acktm;v;av;dv");
	var radekcount=0;
	var radek="";
	datax=data;
	var pomlist=Object.keys(datax)
	for (var i=0;i<pomlist.length;i++) {
		var id=datax[pomlist[i]]['id'];
		var cell=Object.keys(datax[pomlist[i]]['cell'])
		//console.log(datax[pomlist[i]]['cell']);
		radek=datax[pomlist[i]]['cell']['atm']+";";
		radek+=datax[pomlist[i]]['cell']['dtm']+";";
		radek+=datax[pomlist[i]]['cell']['acktm']+";";
		radek+=id+";";
		radek+=datax[pomlist[i]]['cell']['msg']+";";
		radek+=datax[pomlist[i]]['cell']['area']+";";
		radek+=datax[pomlist[i]]['cell']['dev']+";";
		radek+=datax[pomlist[i]]['cell']['stat']+";";
		radek+=datax[pomlist[i]]['cell']['sv']+";";
		radek+=datax[pomlist[i]]['cell']['v']+";";
		radek+=datax[pomlist[i]]['cell']['av']+";";
		radek+=datax[pomlist[i]]['cell']['dv'];
		//radek+=datax[pomlist[i]]['cell']['ak']+";";
		console.log(radek);
		radekcount++;
	}
	console.log("Pocet Radku:"+radekcount	);
}

function __getDatalogId(datalogname) {
	try {var id=__datalogs[datalogname]['id']; } catch (e) {console.log("Datalog "+datalogname+" not found !");var id=0;}
	return id;
}
exports.getDatalogId=__getDatalogId;

function __getDatalogName(datalogid) {
	try {var name=__datalogs[datalogid]['name']; } catch (e) {console.log("Datalog "+datalogid+" not found !");var id=0;}
	return name;
}

function __getDatalogNameSize(datalogname) {
	try {var __size=__datalogs[datalogname]['tags'].length; } catch (e) {console.log("Datalog "+datalogname+" not found !");var __size=0;}
	return __size;
}

function __getDatalogNameType(datalogname) {
	try {var type=__datalogs[datalogname]['scriptDatalog']; } catch (e) {console.log("Datalog "+datalogname+" not found !");var type=-1;}
	return type;
}

function __histoDlgTags(datalogname,start,end,tagslist,limit,callback) {
	{
		var tags="";
		if (tagslist=="") {
			var pomlist=Object.keys(__datalogs[datalogname]['tags']);
			for (var i=0;i<pomlist.length;i++) {
				tags+=__datalogs[datalogname]['tags'][i]['id'];
				if (i<pomlist.length-1) {tags+=",";}
			}
		} else {tags=tagslist;}
		if (limit==0) {var limitu="";} else {
		  if (limit>0) {var limitu="&limit="+limit;} else {var limitu="&limitEnd="+Math.abs(limit);}
		}
		var id=__getDatalogId(datalogname);
		if (__locklist.histolock['lock']==0) {	
			// zamek __locklist.histolock['lock']=1;
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.histolock['time']=unixtimestamp;
			 {
				writestring="t=31&prj="+__projectID+"&start="+start+"&end="+end+"&tags="+id+"|"+tags+limitu+"\3";
				log(">"+writestring+"<");
				__getRequest(true,writestring,function (err,data){
                                        if (!err)
                                        {
					var dataj=JSON.parse(data);
					if (dataj['s']==0) {var status=0;} else {var status=1;}
					try {__myevent.removeAllListeners('r31')} catch (e) {console.log(e);};
					__locklist.histolock['lock']=0;
					callback(status,dataj['d']);
					return;
                                    } else {callback(0);}
				});
			}
		}
	}
}

/**
 * Function will return historical data from given data-log.
 * @param {type} datalogname specify data-log name
 * @param {type} start starting date specified as seconds since 1970/01/01
 * @param {type} end is the ending date again specified as seconds since 1970/01/01
 * @param {type} tags columns you would like to read
 * @param {type} limit maximal number of records returned
 * @param {type} callback
 * @returns {undefined}
 */
function histoDlgTags(datalogname,start,end,tags,limit,callback) {
		 {
		__histoDlgTags(datalogname,start,end,tags,limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
                                
                                for (var x=0;x<vnitrni.length;x++) {
                                        var a=vnitrni[x];
                                        a.tm=getDateFromTM(a.tm);
                                        }
				//callback(1,data);
                                callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlgTags=histoDlgTags;


function _histoDlgCreatePictureForPens(datalogname,start,end,filename,names,keys,limit,w,h,form,callback) {
    {
    __histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
            if (!status) {console.log("ERROR\n");callback(0);return;} 
            else  {
                var obj=new Object();
                var klice=Object.keys(data); 

                var vnitrni=data[klice[0]]['d'];

                var pole=new Array();

                if (keys.length===0) {
                    var pomkeys=Object.keys(vnitrni[0]);
                    for (k=0;k<pomkeys.length;k++) {
                        var hodpom=pomkeys[k];
                        if (hodpom!="tm") {
                            keys.push(hodpom);
                        }
                    }
                  //  names=keys;
                }

                //doplnime jmena
                if (names.length===0) {
                    var dlga=__datalogs[datalogname];
                    var tags=dlga.tags;

                    for (ll=0;ll<keys.length;ll++) {
                        var aktklic=keys[ll];
                        for (l=0;l<tags.length;l++) {
                            var pomvar=tags[l];
                            if (pomvar.id===aktklic) {
                                names.push(pomvar.name);
                                break;
                            }
                        }
                    }
                }

                for (i=0;i<keys.length;i++) {
                    pole.push(new Object());
                }

                var moment = require('moment');
                var zone = -60*moment().zone();
                for (var x=0;x<vnitrni.length;x++) {
                    var pol=vnitrni[x];
                    var time=pol.tm[0]+zone;

                    for (j=0;j<keys.length;j++) {
                        var indexje=keys[j];
                        var valueis=pol[indexje];
                        var kam=pole[j];
                        kam[time]=valueis;
                    }
                }
                for (i=0;i<keys.length;i++) {
                    if (i < names.length) {
                        obj[names[i]] = pole[i];
                    }
                    else {
                        obj[keys[i]] = pole[i];
                    }
                }

                var plot = require('plotter').plot;

                plot({
                    data:    obj,
                    filename:filename,
                    time:    'hours',
                    format:  form,
                    width:   w,
                    height:  h,
                    finish:  function(){callback(1);}
//                                           finish:      callback(1)
                });

                //callback(1,data);
                //callback(1,vnitrni);
                return;
            }
        });
    }
}

/**
 * This function will create graph from datalog's data for defined pens.
 * @param {type} datalogname specify data-log name
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} filename specified newly created file (wmf or emf format)
 * @param {type} keys is pens you would like to read
 * @param {type} limit is maximal number of records
 * @param {type} w is the picture width
 * @param {type} h is the picture height
 * @param {type} format is the picture format
 * @param {type} callback
 * @returns {unresolved}
 */
function histoDlgCreatePictureForPens(datalogname,start,end,filename,keys,limit,w,h,format,callback) {
    return _histoDlgCreatePictureForPens(datalogname,start,end,filename,[],keys,limit,w,h,format,callback);
}

exports.histoDlgCreatePictureForPens=histoDlgCreatePictureForPens;

/**
 * This function will create graph from datalog's data for defined pens with custom names.
 * @param {type} datalogname specify data-log name
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} filename specified newly created file (wmf or emf format)
 * @param {type} names is pen's name
 * @param {type} keys is pens you would like to read
 * @param {type} limit is the maximal number of records
 * @param {type} w is the picture width
 * @param {type} h is the picture height
 * @param {type} format is the picture format
 * @param {type} callback
 * @returns {unresolved}
 */
function histoDlgCreatePictureForPensWithNames(datalogname,start,end,filename,names,keys,limit,w,h,format,callback) {
    return _histoDlgCreatePictureForPens(datalogname,start,end,filename,names,keys,limit,w,h,format,callback);
}

exports.histoDlgCreatePictureForPensWithNames=histoDlgCreatePictureForPensWithNames;

/**
 * This function will create graph from datalog's data.
 * @param {type} datalogname specify data-log name
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} filename specified newly created file (wmf or emf format)
 * @param {type} limit maximal number of records
 * @param {type} w is the picture width
 * @param {type} h is the picture height
 * @param {type} format is the picture format
 * @param {type} callback to execute when the picture are ready
 * @returns {unresolved}
 */
function histoDlgCreatePicture(datalogname,start,end,filename,limit,w,h,format,callback) {
    return _histoDlgCreatePictureForPens(datalogname,start,end,filename,[],[],limit,w,h,format,callback);
}
exports.histoDlgCreatePicture=histoDlgCreatePicture;

/**
 * Function will return historical data from given data-log.
 * @param {type} datalogname specify data-log name
 * @param {type} start starting date specified as seconds since 1970/01/01
 * @param {type} end ending date again specified as seconds since 1970/01/01
 * @param {type} limit maximal number of records returned
 * @param {type} callback to execute when the data are ready
 * @returns {undefined}
 */
function histoDlg(datalogname,start,end,limit,callback) {
		 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
                                
                                for (var x=0;x<vnitrni.length;x++) {
                                        var a=vnitrni[x];
                                        a.tm=getDateFromTM(a.tm);
                                        }
				//callback(1,data);
                                callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlg=histoDlg;

function histoDlgRaw(datalogname,start,end,limit,callback) {
		 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
				callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlgRaw=histoDlgRaw;

function FormatNumberStr(format, number){
        default_number_format= "#.#";
	if(format === undefined || format.length <= 0)
	    format = default_number_format;

	var ret = format;
	var i = 0;
	for(i = 0;;i++){
	    var matched = ret.match(/(?:(^|[^\\]{1}))((#)+((\.|,)(#)+)?)|((\.|,)(#)+)/g);
		if(matched == null || i >100)
			break;
		var matched = matched[0].match(/((#)*(\.|,)?(#)*)$/g);
		var f1 = matched[0];
		
		if(isNaN(number)){
		    ret = ret.replace(f1, "NaN");
		    continue;
		}else if(number === Infinity){
		    ret = ret.replace(f1, "Infinity");
		    continue;
		}else if(number === -Infinity){
		    ret = ret.replace(f1, "-Infinity");
		    continue;
		}

		var isBefore = false;
		var isAfter = false;
		var beforeCount = 0;
		var afterCount = 0;
					
		var splitted = f1.split(/(\.|,)/g);
		var delim = "";
		var isDelim = false;
		for(var j = 0; j < splitted.length;j++){
			var sj = splitted[j];
			if(sj.match(/^(#)+$/g) != null){
				if(!isDelim){
					isBefore = true;
					beforeCount = sj.length;
				}else{
					isAfter = true;
					afterCount = sj.length;
				}
			}else{
				isDelim = true;
				delim = sj;
			}
		}
		var formatted = "";
		var is_minus = false;

		var digits = 0;
		if(isDelim && isAfter)
		    digits = afterCount;
		var num = number.toFixed(digits);
		
		var is_less_than0 = parseFloat(num) < 0;
		
		var decimals;
		decimals = isAfter ? num.indexOf(".") : num.length;
		if(is_less_than0)
		    decimals-=1;

		var zeros = new Array( beforeCount - decimals > 0 ? beforeCount - decimals +1 : 1).join("0");
		formatted = (is_less_than0?"-":"")+zeros+(is_less_than0?num.substring(1):num);

		if(isDelim && delim != ".")
		    formatted = formatted.replace(".", delim);
		
		if(isDelim && !isAfter)
		    formatted+=delim;
		ret = ret.replace(f1, formatted);
	}
	if(i == 0){	//nebyl nalezen string #
	    return FormatNumberStr(default_number_format, number);	    
	}
	
	return ret;
    }
    
/**
 * Function will return historical data from given data-log and format then for direct use with MS Word Template Report.
 * @param {type} datalogname specify data-log name
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} limit is the maximal number of records returned
 * @param {type} format is used to custom format date
 * @param {type} callback execute when the data are ready
 * @returns {undefined}
 */
function histoDlgForReport(datalogname,start,end,limit,format,callback) {
		 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
                                
                                for (var x=0;x<vnitrni.length;x++) {
                                        var a=vnitrni[x];
                                        a.tm=getFromatedDateFromTM(a.tm,format);
                                        
                                        var pomlist=Object.keys(__datalogs[datalogname]['tags']);
                                        for (var i=0;i<pomlist.length;i++) {
                                                var format2=__datalogs[datalogname]['tags'][i]['format'];
                                                index=__datalogs[datalogname]['tags'][i]['id'];
                                                cislo=a[index];
                                                a[index]=FormatNumberStr(format2,cislo);
                                        }
                                }
				//callback(1,data);
                                callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlgForReport=histoDlgForReport;

function histoDlgForReportWithTags(datalogname,start,end,tagslist,limit,format,callback) {
     {
        __histoDlgTags(datalogname,start,end,tagslist,limit,function(status,data) {
            if (!status) {console.log("ERROR\n");callback(0,0);return;} 
            else  {
                var klice=Object.keys(data); 
                var vnitrni=data[klice[0]]['d'];
                var kliceList=Object.keys(tagslist); 
                for (var x=0;x<vnitrni.length;x++) {
                    var a=vnitrni[x];
                    a.tm=getFromatedDateFromTM(a.tm,format);
                    var pomlist=Object.keys(__datalogs[datalogname]['tags']);
                    for (var i=0;i<pomlist.length;i++) {
                        var format2=__datalogs[datalogname]['tags'][i]['format'];
                        index=__datalogs[datalogname]['tags'][i]['id'];
                        for (var j=0; j<kliceList.length; j++) {
                            if (tagslist[kliceList[j]] == index) {
                                cislo=a[index];
                                a[index]=FormatNumberStr(format2,cislo);
                            }
                        }
                    }
                }
                //callback(1,data);
                callback(1,vnitrni);
                return;
            }
        });
    }
}
exports.histoDlgForReportWithTags=histoDlgForReportWithTags;

function histoDlgForReportNoRounding(datalogname,start,end,limit,format,callback) {
		 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
                                
                                for (var x=0;x<vnitrni.length;x++) {
                                        var a=vnitrni[x];
                                        a.tm=getFromatedDateFromTM(a.tm,format);
                                }
				//callback(1,data);
                                callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlgForReportNoRounding=histoDlgForReportNoRounding;

function histoDlgForReportRounded(datalogname,start,end,limit,format,decimalplaces,callback) {
		 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {console.log("ERROR\n");callback(0,0,0);return;} 
			else  {
                                var klice=Object.keys(data); 
                                var vnitrni=data[klice[0]]['d'];
                                
                                for (var x=0;x<vnitrni.length;x++) {
                                        var a=vnitrni[x];
                                        a.tm=getFromatedDateFromTM(a.tm,format);
                                        
                                        for (var i in a) {
                                             if (i != "tm")
                                            {
                                                a[i]=a[i].toFixed(decimalplaces);
                                            }
                                        }
                                    }
				//callback(1,data);
                                callback(1,vnitrni);
                                return;
			}
		});
	}
}
exports.histoDlgForReportRounded=histoDlgForReportRounded;

function __writeCSVData(filename,datalogname,data,tags,mode,format,callback) {
    try{
        log("Save data to CSV:");
        var fs = require('fs');
        var f = fs.openSync(getFilename(filename), mode);
        var radekcount=0;
        var radek="datetime;";
        if (tags=="") {
            for (var i=0;i<__datalogs[datalogname]['tags'].length;i++) {
                radek+=__datalogs[datalogname]['tags'][i]['name'];
                if (i<__datalogs[datalogname]['tags'].length-1) {radek+=";";} else {radek+="\r\n";}
            }
        } else {
            var tagy=tags.split(",");
            for (var a=0;a<tagy.length;a++) {
                radek+=__datalogs[datalogname]['tags'][a]['name'];
                if (a<tagy.length-1) {radek+=";";} else {radek+="\r\n";}
            }
        }
        var bout = new Buffer(radek, 'utf8');

        if (mode==="w") //pouze pri vytvoreni
        {
            fs.writeSync(f, bout, 0, bout.length);
        }
        delete(bout);
        radek="";
        datax=data;
        var pomlist=Object.keys(datax)
        for (var i=0;i<pomlist.length;i++) {
            for (var x=0;x<datax[pomlist[i]]['d'].length;x++) {
                var pomlist2=Object.keys(datax[pomlist[i]]['d'][x])

                var ppp=""+datax[pomlist[i]]['d'][x]['tm'][0]+","+datax[pomlist[i]]['d'][x]['tm'][1];
                radek+=getFromatedDateFromTM(ppp,format)+";";

                if (pomlist2.length>1){
                    for (var z=0;z<pomlist2.length;z++) {
                        if ([pomlist2[z]]!="tm") {
                            radek+=datax[pomlist[i]]['d'][x][pomlist2[z]];
                            if (z<pomlist2.length-2) {radek+=";";} else {radek+="\r\n";}
                        }
                    }
                } else {
                    for (var a=0;a<__datalogs[datalogname]['tags'].length;a++) {
                        radek+="NaN";
                        if (a<__datalogs[datalogname]['tags'].length-1) {radek+=";";} else {radek+="\r\n";}
                    }
                }
                var bout = new Buffer(radek, 'utf8');
                fs.writeSync(f, bout, 0, bout.length);
                delete(bout);
                radekcount++;
                radek="";
            }
        }
        fs.closeSync(f);
        callback(1);
        return;
    } catch (e) {callback(0);return;}
}
//function __writeCSVData(filename,datalogname,data,tags,mode,format,callback) {
//	try{
//		log("Save data to CSV:");
//		var fs = require('fs');
//		var f = fs.openSync(getFilename(filename), mode);
//		var radekcount=0;
//		var radek="datetime;";
//		if (tags=="") {	
//			for (var i=0;i<__datalogs[datalogname]['tags'].length;i++) {
//				radek+=__datalogs[datalogname]['tags'][i]['name'];
//				if (i<__datalogs[datalogname]['tags'].length-1) {radek+=";";} else {radek+="\r\n";}
//			}
//		} else {
//			var tagy=tags.split(",");
//			for (var a=0;a<tagy.length;a++) {
//				radek+=__datalogs[datalogname]['tags'][tagy[a]]['name'];
//				if (a<tagy.length-1) {radek+=";";} else {radek+="\r\n";}
//			}
//		}
//		var bout = new Buffer(radek, 'utf8');
//                
//                if (mode==="w") //pouze pri vytvoreni
//                {
//		fs.writeSync(f, bout, 0, bout.length);
//                }
//		delete(bout);
//		radek="";
//		datax=data;
//		var pomlist=Object.keys(datax)
//		for (var i=0;i<pomlist.length;i++) {
//			for (var x=0;x<datax[pomlist[i]]['d'].length;x++) {
//				var pomlist2=Object.keys(datax[pomlist[i]]['d'][x])
//                                
//				var ppp=""+datax[pomlist[i]]['d'][x]['tm'][0]+","+datax[pomlist[i]]['d'][x]['tm'][1];
//				radek+=getFromatedDateFromTM(ppp,format)+";";
//                                
//                                for (var z=0;z<pomlist2.length;z++) {
//					if ([pomlist2[z]]!="tm") {
//						radek+=datax[pomlist[i]]['d'][x][pomlist2[z]];
//						if (z<pomlist2.length-2) {radek+=";";} else {radek+="\r\n";}
//					}
//				}
//			var bout = new Buffer(radek, 'utf8');
//			fs.writeSync(f, bout, 0, bout.length);
//			delete(bout);
//			radekcount++;
//			radek="";
//			}
//		}
//		fs.closeSync(f);
//		callback(1);
//	} catch (e) {callback(0);}
//
//}

/**
 * Function will read historical data from given data-log and save them to a newly created file specified in first parameter.
 * If file already exists it is overwritten. Format of saved data is CSV.
 * @param {type} filename
 * @param {type} datalogname specify data-log name
 * @param {type} format is used to custom format date
 * @param {type} start starting date specified as seconds since 1970/01/01
 * @param {type} end ending date again specified as  seconds since 1970/01/01
 * @param {type} limit maximal number of records returned
 * @param {type} callback
 * @returns {undefined}
 */
function histoDlgCSV(filename,datalogname,format,start,end,limit,callback) {
	 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {log("ERROR\n");callback(0);return;} 
			else  {
				__writeCSVData(filename,datalogname,data,"","w",format,function(status) {
					if (!status) {log("ERROR\n");callback(0);return;} 	
						else {
							callback(1);
							return;
						}
				});
			}
		});
	}
}
exports.histoDlgCSV=histoDlgCSV;

function histoDlgAppendCSV(filename,datalogname,format,start,end,limit,callback) {
	 {
		__histoDlgTags(datalogname,start,end,"",limit,function(status,data) {
			if (!status) {log("ERROR\n");callback(0);return;} 
			else  {
				__writeCSVData(filename,datalogname,data,"","a",format,function(status) {
					if (!status) {log("ERROR\n");callback(0);return;} 	
						else {
							callback(1);
							return;
						}
				});
			}
		});
	}
}
exports.histoDlgAppendCSV=histoDlgAppendCSV;

/**
 * Function will read historical data from given data-log and save them to a newly created file specified in first parameter.
 * If file already exists it is overwritten. Format of saved data is CSV.
 * @param {type} filename
 * @param {type} datalogname specify data-log name
 * @param {type} format custom format date
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} tags columns you would like to read
 * @param {type} limit maximal number of records returned
 * @param {type} callback
 * @returns {undefined}
 */
function histoDlgTagsCSV(filename,datalogname,format,start,end,tags,limit,callback) {
	 {
		__histoDlgTags(datalogname,start,end,tags,limit,function(status,data) {
			if (!status) {log("ERROR\n");callback(0);return;} 
			else  {
				__writeCSVData(filename,datalogname,data,tags,'w',format,function(status) {
					if (!status) {log("ERROR\n");callback(0);return;} 	
						else {
							callback(1);
							return;
						}
				});
			}
		});
	}
}
exports.histoDlgTagsCSV=histoDlgTagsCSV;

function histoDlgTagsAppendCSV(filename,datalogname,format,start,end,tags,limit,callback) {
	 {
		__histoDlgTags(datalogname,start,end,tags,limit,function(status,data) {
			if (!status) {log("ERROR\n");callback(0);return;} 
			else  {
				__writeCSVData(filename,datalogname,data,tags,'a',format,function(status) {
					if (!status) {log("ERROR\n");callback(0);return;} 	
						else {
							callback(1);
							return;
						}
				});
			}
		});
	}
}
exports.histoDlgTagsAppendCSV=histoDlgTagsAppendCSV;

function logFile(stringtext)
{
    var fs = require('fs');
    if (__mySCADADebugOutput != "") {
        fs.appendFile(__mySCADADebugOutput+'/user_scripts.log', stringtext+"\n");
    }
    else {
        fs.appendFile('/var/log/user_scripts.log', stringtext+"\n");
    }
}
exports.logFile=logFile;

function logFilePathSet(stringtext)
{
   __mySCADADebugOutput=stringtext;
}
exports.logFilePathSet=logFilePathSet;

function logFileClear()
{
    var fs = require('fs');
    if (__mySCADADebugOutput != "") {
        fs.writeFile(__mySCADADebugOutput+'/user_scripts.log', "");
    }
    else {
        fs.writeFile('/var/log/user_scripts.log', "");
    }
}
exports.logFileClear=logFileClear;

function requireIncludes(name) {
    if (__mySCADADebugIncludes != "") {
        return require(__mySCADADebugIncludes+"/"+name);    
    }else {
        return require(__mySCADAConfig.pFolder+"/Scripts/Includes/"+name);
//        return require("./Includes/"+name);    
    }
}
exports.requireIncludes=requireIncludes;

function getFilenameIncludes(filename){
    if (filename.substring(0, 1) === "/" || filename.substring(1, 2)===":") {
        return filename;
    }
    else {
	//file=__mySCADAConfig.dbPath+"/user/"+filename;
        if (__mySCADADebugIncludes != "") {
            file = __mySCADADebugIncludes+"/"+filename;
        }else {
            file = __mySCADAConfig.pFolder+"/Scripts/Includes/"+filename;
//            file = "./Includes/"+filename;
        }
	return file;
    }
}
exports.getFilePathIncludes=getFilenameIncludes;

function getFilename(filename){
    if (filename.substring(0, 1) === "/" || filename.substring(1, 2)===":") {
        return filename;
    }
    else {
        //file=__mySCADAConfig.dbPath+"/user/"+filename;
        if (__mySCADADebugOutput != "") {
            file = __mySCADADebugOutput+"/"+filename;
        }
        else {
            file = __mySCADAConfig.userFtpDir+"/"+filename;
        }
        return file;
    }
}
exports.getFilename=getFilename;
exports.getFilePathUserScripts=getFilename;
exports.getFilePathUserData=getFilename;

function getFilenameUserFilesDir(){
    
        //file=__mySCADAConfig.dbPath+"/user/"+filename;
        if (__mySCADADebugUserFiles != "") {
            file = __mySCADADebugUserFiles;
        }
        else {
            file = __mySCADAConfig.pFolder+"/Scripts/UserFiles";
//            file = "./UserFiles/"+filename;
        }
        return file;
    
}
exports.getFilePathUserFilesDir=getFilenameUserFilesDir;


function getFilenameUserFiles(filename){
     if (filename.substring(0, 1) == "/" || filename.substring(1, 2)==":") {
        return filename;
     }
     else {
        //file=__mySCADAConfig.dbPath+"/user/"+filename;
        if (__mySCADADebugUserFiles != "") {
            file = __mySCADADebugUserFiles+"/"+filename;
        }
        else {
            file = __mySCADAConfig.pFolder+"/Scripts/UserFiles/"+filename;
//            file = "./UserFiles/"+filename;
        }
        return file;
    }
}
exports.getFilePathUserFiles=getFilenameUserFiles;

function __writeCSVAlarms(file,data,callback,mode,format)
{
	log(data);
	try{
		log("Save Alarms to CSV:");
		var fs = require('fs');
		var f = fs.openSync(getFilename(file), mode);
		var radek="";
		var radekcount=0;
                
                if (mode==="w") //pouze pri vytvoreni
                {
                radek="atm;dtm;acktm;id;msg;area;dev;stat;sv;av;dv;ackv;f;user\r\n";
		var bout = new Buffer(radek, 'utf8');
		fs.writeSync(f, bout, 0, bout.length);
		delete(bout);
                }
		datax=data;
		var pomlist=Object.keys(datax)
		for (var i=0;i<pomlist.length;i++) {						
			var id=datax[pomlist[i]]['id'];
                        
			var cell=Object.keys(datax[pomlist[i]]['cell'])
			radek=getFromatedDateFromTM(datax[pomlist[i]]['cell']['atm'],format)+";";
			radek+=getFromatedDateFromTM(datax[pomlist[i]]['cell']['dtm'],format)+";";
			radek+=getFromatedDateFromTM(datax[pomlist[i]]['cell']['acktm'],format)+";";
			radek+=id+";";
			radek+=datax[pomlist[i]]['cell']['msg']+";";
			radek+=datax[pomlist[i]]['cell']['area']+";";
			radek+=datax[pomlist[i]]['cell']['dev']+";";
			radek+=datax[pomlist[i]]['cell']['stat']+";";
			radek+=datax[pomlist[i]]['cell']['sv']+";";
			radek+=datax[pomlist[i]]['cell']['av']+";";
			radek+=datax[pomlist[i]]['cell']['dv']+";";
			radek+=datax[pomlist[i]]['cell']['ackv']+";";
			radek+=datax[pomlist[i]]['cell']['f']+";";
			radek+=datax[pomlist[i]]['cell']['user'];
			radek+="\r\n";
			var bout = new Buffer(radek, 'utf8');
			fs.writeSync(f, bout, 0, bout.length);
			delete(bout);
			radekcount++;
		}
		//console.log("Pocet Radku:"+radekcount	);
		fs.closeSync(f);
		callback(1);
		return;
	} catch (e) {callback(0);return;}
}


function __histoAlarms(start,end,limit,callback)
{
	 {
		if (limit==0) {var limitu="";} else {var limitu="&limit="+limit;}
		if (__locklist.histoalarmlock['lock']==0) {	
			// zamek __locklist.histoalarmlock['lock']=1;
			var unixtimestamp = Math.round(+new Date()/1000); 
			__locklist.histoalarmlock['time']=unixtimestamp;
			writestring="t=30&prj="+__projectID+"&start="+start+"&end="+end+limitu+"\3";
			log(">"+writestring+"<");
			__getRequest(true,writestring,function (err,data){
                            if (!err)
                            {
			var dataj=JSON.parse(data);
			if (dataj['s']==0) {var status=0;} else {var status=1;}
				try {__myevent.removeAllListeners('r30')} catch (e) {console.log(e);};
				__locklist.histoalarmlock['lock']=0;
				callback(status,dataj['d']);
				return;
                            }
                            else {callback(0);}
			});
		}
	}
}

/**
 * Function will return the history of alarms in the defined time interval.
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} limit is the maximal number of records returned
 * @param {type} callback to execute when the data are ready
 * @returns {undefined}
 */
function histoAlarms(start,end,limit,callback)
{
   
    		__histoAlarms(start,end,limit,function(status,data) {
		if (!status) {callback(0,0);return;} 
			else  {
                            
				                datax=data;
                                                var pomlist=Object.keys(datax);
                                                var returnval= new Array();
                                                for (var i=0;i<pomlist.length;i++) {
                                                        var retval=new Object();
                                                        
                                                        var datepom=datax[pomlist[i]]['cell']['atm'];
                                                        var tmstr=datepom[0]+","+datepom[1];
                                                        retval.atm=getDateFromTM(tmstr);
                                                        datepom=datax[pomlist[i]]['cell']['dtm'];
                                                        tmstr=datepom[0]+","+datepom[1];
                                                        retval.dtm=getDateFromTM(tmstr);
                                                        datepom=datax[pomlist[i]]['cell']['acktm'];
                                                        tmstr=datepom[0]+","+datepom[1];;
                                                        retval.acktm=getDateFromTM(tmstr);
                                                        
                                                        retval.msg=datax[pomlist[i]]['cell']['msg'];
                                                        retval.area=datax[pomlist[i]]['cell']['area'];
                                                        retval.dev=datax[pomlist[i]]['cell']['dev'];
                                                        retval.stat=datax[pomlist[i]]['cell']['stat'];
                                                        retval.sv=datax[pomlist[i]]['cell']['sv'];
                                                        retval.actval=datax[pomlist[i]]['cell']['av'];
                                                        retval.deactval=datax[pomlist[i]]['cell']['dv'];
                                                        retval.ackval=datax[pomlist[i]]['cell']['ackv'];
                                                        retval.f=datax[pomlist[i]]['cell']['f'];
                                                        retval.user=datax[pomlist[i]]['cell']['user']; 
                                                        returnval.push(retval);
                                                }

						callback(1,returnval);
						return;
                                            }
				});
			
}
exports.histoAlarms=histoAlarms;

/**
 * >Function will return the history of alarms in the defined time interval and format then for direct use with MS Word Template Report.
 * History of alarms is saved in the data object structure you will receive in a callback function.
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} limit is the maximal number of records returned
 * @param {type} format is used to custom format date
 * @param {type} callback
 * @returns {undefined}
 */
function histoAlarmsForReport(start,end,limit,format,callback)
{
   
    		__histoAlarms(start,end,limit,function(status,data) {
		if (!status) {callback(0,0);return;
                
                    } 
			else  {
                            
				                datax=data;
                                                var pomlist=Object.keys(datax);
                                                var returnval= new Array();
                                                for (var i=0;i<pomlist.length;i++) {
                                                        var retval=new Object();
                                                        
                                                        var datepom=datax[pomlist[i]]['cell']['atm'];
                                                        var tmstr=datepom[0]+","+datepom[1];
							if (datepom[0]==0 && datepom[1]==0) {
							  retval.atm="";
							} else {
							  retval.atm=getFromatedDateFromTM(tmstr,format);
							}
                                                        
							datepom=datax[pomlist[i]]['cell']['dtm'];
                                                        tmstr=datepom[0]+","+datepom[1];
							if (datepom[0]==0 && datepom[1]==0) {
							  retval.dtm="";
							}else {
							  retval.dtm=getFromatedDateFromTM(tmstr,format);
							}
							
                                                        datepom=datax[pomlist[i]]['cell']['acktm'];
                                                        tmstr=datepom[0]+","+datepom[1];;
							if (datepom[0]==0 && datepom[1]==0) {
							  retval.acktm="";
							} else {
							  retval.acktm=getFromatedDateFromTM(tmstr,format);
							}
                                                        
                                                        retval.msg=datax[pomlist[i]]['cell']['msg'];
                                                        retval.area=datax[pomlist[i]]['cell']['area'];
                                                        retval.dev=datax[pomlist[i]]['cell']['dev'];
                                                        retval.stat=datax[pomlist[i]]['cell']['stat'];
                                                        retval.sv=datax[pomlist[i]]['cell']['sv'];
                                                        retval.actval=datax[pomlist[i]]['cell']['av'];
                                                        retval.deactval=datax[pomlist[i]]['cell']['dv'];
                                                        retval.ackval=datax[pomlist[i]]['cell']['ackv'];
                                                        retval.f=datax[pomlist[i]]['cell']['f'];
                                                        retval.user=datax[pomlist[i]]['cell']['user']; 
                                                        returnval.push(retval);
                                                }

						callback(1,returnval);
						return;
                                            }
				});
			
}
exports.histoAlarmsForReport=histoAlarmsForReport;

/**
 * Creates a table of history of alarms sorted by occurance. Function will return the history of alarms sorted and grouped by occurence in the defined time interval and format then for direct use with MS Word Template Report.
 * History of alarms is saved in the data object structure you will receive in a callback function.
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} limitRes is the maximal number of records returned
 * @param {type} limit is the maximal number of records processed
 * @param {type} callback
 * @returns {undefined}
 */
function histoAlarmsOccurenceForReport(start,end,limitRes,limit,callback)
{
   
    		__histoAlarms(start,end,limit,function(status,data) {
		if (!status) {callback(0,0);return;
                
                    } 
			else  {
                                                var pole=new Array();
                                                
                                                
				                datax=data;
                                                var pomlist=Object.keys(datax);
                                                var returnval= new Array();
                                                for (var i=0;i<pomlist.length;i++) {
                                                        
                                                        
                                                        var id=datax[pomlist[i]]['id'];
                                                        
                                                        var stat=datax[pomlist[i]]['cell']['stat'];
                                                        
                                                        if (stat==1)
                                                        {
                                                            var hod=pole[id];
                                                            if (hod==undefined)
                                                            {
                                                                var retval=new Object();

                                                                retval.msg=datax[pomlist[i]]['cell']['msg'];
                                                                retval.area=datax[pomlist[i]]['cell']['area'];
                                                                retval.dev=datax[pomlist[i]]['cell']['dev'];

                                                                //retval.stat=datax[pomlist[i]]['cell']['stat'];
                                                                retval.sv=datax[pomlist[i]]['cell']['sv'];
                                                                //retval.actval=datax[pomlist[i]]['cell']['av'];
                                                                //retval.deactval=datax[pomlist[i]]['cell']['dv'];
                                                                //retval.ackval=datax[pomlist[i]]['cell']['ackv'];
                                                                //retval.f=datax[pomlist[i]]['cell']['f'];
                                                                //retval.user=datax[pomlist[i]]['cell']['user']; 
                                                                retval.count=1;
                                                                pole[id]=retval;
                                                            }
                                                            else
                                                            {
                                                                hod.count=hod.count+1;
                                                            }
                                                        }
                                                        //returnval.push(retval);
                                                }
                                                function compare(a,b)
                                                {
                                                    return b.count-a.count;
                                                }
                                                
                                                pole.sort(compare);
                                                
                                                var ret=new Array();
                                                var pocet=0;
                                                pole.forEach(function(s)
                                                {
                                                    if (pocet<limitRes)
                                                    ret.push(s);
                                                
                                                    pocet++;
                                                    
                                                }        
                                                )
						callback(1,ret);
						return;
                                            }
				});
			
}
exports.histoAlarmsOccurenceForReport=histoAlarmsOccurenceForReport;

function histoAlarmsAppendCSV(file,format,start,end,limit,callback)
{
              
		__histoAlarms(start,end,limit,function(status,data) {
		if (!status) {callback(0);return;} 
			else  {
				__writeCSVAlarms(file,data,function(status) {
				if (!status) {callback(0);} 
					else  {
						callback(1);
						return;
					}
				},'a',format);
			}	
		});
}
exports.histoAlarmsAppendCSV=histoAlarmsAppendCSV;

/**
 * Function will return the history of alarms in the defined time interval and save them to a newly created file specified in first parameter.
 * If file already exists it is overwritten. Format of saved data is CSV.
 * @param {type} file
 * @param {type} format used to custom format date
 * @param {type} start is starting date specified as seconds since 1970/01/01
 * @param {type} end is ending date again specified as seconds since 1970/01/01
 * @param {type} limit is the maximal number of records returned
 * @param {type} callback
 * @returns {undefined}
 */
function histoAlarmsCSV(file,format,start,end,limit,callback)
{
		__histoAlarms(start,end,limit,function(status,data) {
		if (!status) {callback(0);return;} 
			else  {
				__writeCSVAlarms(file,data,function(status) {
				if (!status) {callback(0);return;} 
					else  {
						callback(1);
						return;
					}
				},'w',format);
			}	
		});
}
exports.histoAlarmsCSV=histoAlarmsCSV;
/* MAIN GLOBAL */

function log(data) {
	if (__debug_main==1) { console.log(data);}
}

function ping(__host,callback){
    if (__mySCADAConfig.os=="WINDOWS") {
        exec("ping -n 1 -w 1 "+__host, function (error, stdout, stderr) {
            if(stdout.indexOf("(0% loss") > -1) {
                callback(1,__host);
                return;
            } else {
                callback(0,__host);
                return;
            }
        });
    }
    else {
        exec("ping -c1 -w1 "+__host, function (error, stdout, stderr) {
            if(stdout.indexOf(" 0% packet loss") > -1) {
                callback(1,__host);
                return;
            } else {
                callback(0,__host);
                return;
            }
        });
    }
}
exports.ping=ping;

function __writeGeneric(rq,callback) {
     {
        console.log('WriteGeneric');
        console.log(rq);
        __getRequest(false,rq,function (err,data){
        });
        callback(0);
        return;
    }
}
exports.__writeGeneric=__writeGeneric;

/**
 * Send SMS to telephone number.
 * @param {type} number
 * @param {type} text
 * @returns {undefined}
 */
function __sendSMS(number,text) {
		//console.log("SendSMS....");
		var net = require('net');
 
		var client_sms = new net.Socket();
		client_sms.connect(11017, '127.0.0.1', function() {
			//console.log('Connected');
			var message = '{"t" :50,"number" :"'+number+'","text" :"'+text+'"}\n';
			//console.log(message)
			client_sms.write(message);
		});
		 
		client_sms.on('data', function(data) {
			//console.log('Received: ' + data);
			client_sms.destroy(); // kill client after server's response
		});
		 
		client_sms.on('close', function() {
			//console.log('Connection closed');
		}); 
        return;
}
exports.sendSMS=__sendSMS;

function __UTF8ArrayToStr(array, from, len) {
    var out, i, c;
    var char2, char3;

    out = "";
//    len = array.length;
    i = from;
    while(i < len) {
        c = array[i++];
        switch(c >> 4) { 
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
          case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[i++];
            char3 = array[i++];
            out += String.fromCharCode(((c & 0x0F) << 12) |
                           ((char2 & 0x3F) << 6) |
                           ((char3 & 0x3F) << 0));
            break;
        }
    }

    return out;
}
function __getStringFromArray(values) {
    return __UTF8ArrayToStr(values, 0, values.length);
//    var string = "";
//    try {
//        for (var i=0; i<values.length; i++) {
//            var xxx = values[i];
//            if (xxx >= 32) {
//                string = string+String.fromCharCode(xxx);
//            }
//        }
//    }  catch (e) {console.log(e);};
//    return string;
}
exports.getStringFromArray=__getStringFromArray;

function __getStringFromArraySiemens(values) {
    return __UTF8ArrayToStr(values, 2, values[1]+2);
//    var string = "";
//    try {
//        for (var i=2; i<values[1]+2; i++) {
//            var xxx = values[i];
//            if (xxx >= 32) {
//                string = string+String.fromCharCode(xxx);
//            }
//        }
//    }  catch (e) {console.log(e);};
//    return string;
}
exports.getStringFromArraySiemens=__getStringFromArraySiemens;

function __getArrayFromStringMake(__string, __pole) {
  // TODO(user): Use native implementations if/when available
  var p = __pole.length;
  for (var i = 0; i < __string.length; i++) {
    var c = __string.charCodeAt(i);
    if (c < 128) {
      __pole[p++] = c;
    } else if (c < 2048) {
      __pole[p++] = (c >> 6) | 192;
      __pole[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) === 0xD800) && (i + 1) < __string.length &&
        ((__string.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (__string.charCodeAt(++i) & 0x03FF);
      __pole[p++] = (c >> 18) | 240;
      __pole[p++] = ((c >> 12) & 63) | 128;
      __pole[p++] = ((c >> 6) & 63) | 128;
      __pole[p++] = (c & 63) | 128;
    } else {
      __pole[p++] = (c >> 12) | 224;
      __pole[p++] = ((c >> 6) & 63) | 128;
      __pole[p++] = (c & 63) | 128;
    }
  }
  return __pole;
}
function __getArrayFromString(__string) {
    var __pole=[];
    return __getArrayFromStringMake(__string, __pole);
//    var __pole=[];
//    for (var i=0; i<__string.length; i++) {
//        __pole.push(__string.charCodeAt(i));
//    }
//    return __pole;
}
exports.getArrayFromString=__getArrayFromString;

function __getArrayFromStringSiemens(__string) {
    var __pole=[];
    __pole.push(__string.length);
    __pole.push(__string.length);
    __pole = __getArrayFromStringMake(__string, __pole);
    __pole[0] = __pole.length-2;
    __pole[1] = __pole[0];
    return __pole;
//    var __pole=[];
//    __pole.push(__string.length);
//    __pole.push(__string.length);
//    for (var i=0; i<__string.length; i++) {
//        __pole.push(__string.charCodeAt(i));
//    }
//    return __pole;
}
exports.getArrayFromStringSiemens=__getArrayFromStringSiemens;

/**
 * Function will read complete table (all variables from the table),
 * with table name provided as first function parameter,
 * as it is defined in „PLC Variables Tables“ or in “Script Variables Tables”.
 * @param {type} table
 * @param {type} callback will be supplied with status of read (1 – read successful, 0- read error)
 * @returns {undefined}
 */
function readTable(table,callback) {
    var count=0;
    var plcname=__convertlist[table]['plcname'];
    var trqc=__convertlist[table]['alias'];
//    var id = Math.round(+new Date()/1000); 
//    if (__locklist.readlock2['lock']==0) {
//	__locklist.readlock2['lock']=1;
    if (__locklist.readlock[trqc]['lock']==0) {
    	var unixtimestamp = Math.round(+new Date()/1000); 
	__locklist.readlock[trqc]['time']=unixtimestamp;
	// zamek __locklist.readlock[trqc]['lock']=1;

        var myInterval=setInterval(function(){
//    	    count++;
    	    readTableOnce(table,function(status) {
		if (!status) {/*console.log("Error reading");*/}
		else{ 
//		    __locklist.readlock2['lock']=0;
		    __locklist.readlock[trqc]['lock']=0;
		    clearInterval(myInterval);
		    callback(1);
		    return;
		}
	    });
	    //pocet pokusu cteni
//	    console.log("Pocet pokusu:"+count+" id:"+id);
	    if (count>10) {
//		    __locklist.readlock2['lock']=0;
		    __locklist.readlock[trqc]['lock']=0;
		    clearInterval(myInterval);
		    callback(0);
		    return;
	    }
            else {
                count++;
            }
	},500);
    } else {
//	console.log("Locked");
	callback(0);
	}
};
exports.readTable=readTable;

/**
 * Create report.
 * @param {type} reportTemplate
 * @param {type} callback
 * @returns {undefined}
 */
function _createReport(reportTemplate,callback) {
  try {
    var fs = require('fs');
    fs.exists(reportTemplate, function(exists) {
        if (!exists) {
            console.log("...... report template file "+reportTemplate+" not exists");
            callback(0,null);
        }
        else {
            // for setting the picture dimensions there is a function ‘imageModule’ from the module ‘docxtemplater-image-module’
            ImageModule = require('docxtemplater-image-module');
            imageModule = new ImageModule({centered:false});
            imageModule.getSizeFromData=function(imgData) {
               sizeOf = require('image-size');
               sizeObj = sizeOf(imgData);
               console.log(sizeObj);
               return [sizeObj.width,sizeObj.height];
            };
            
            var content = fs.readFileSync(reportTemplate,"binary");

            // from the module ‘docxtemplater’ there is a created report variable ‘doc’
            var DocxGen = require('docxtemplater');
            var doc = new DocxGen(content);
            doc.attachModule(imageModule);
            callback(1,doc);
        }
    });
  } catch (e) {console.log("...... createReport ERROR: "+e.message);}
}
exports.createReport=_createReport;

function _createReportSync(reportTemplate) {
  try {
    if (fs.existsSync(reportTemplate)) {
        // for setting the picture dimensions there is a function ‘imageModule’ from the module ‘docxtemplater-image-module’
        ImageModule = require('docxtemplater-image-module');
        imageModule = new ImageModule({centered:false});
        imageModule.getSizeFromData=function(imgData) {
           sizeOf = require('image-size');
           sizeObj = sizeOf(imgData);
           console.log(sizeObj);
           return [sizeObj.width,sizeObj.height];
        };

        var content = fs.readFileSync(reportTemplate,"binary");

        // from the module ‘docxtemplater’ there is a created report variable ‘doc’
        var DocxGen = require('docxtemplater');
        var doc = new DocxGen(content);
        doc.attachModule(imageModule);
        return doc;
    }
    else {
        console.log("...... report template file "+reportTemplate+" not exists");
        return null;
    }
  } catch (e) {console.log("...... createReport ERROR: "+e.message); return null;}
}
exports.createReportSync=_createReportSync;

function _generateReport(doc,reportName) {
  try {
    // by function ‘render()’ the report is created in ZIP format
    doc.render();
    // extract report from ZIP and saved into reportName file
    var output = doc.getZip().generate({type:"nodebuffer"});
    var fs = require('fs');
    fs.writeFileSync(reportName,output);
    console.log("...... report generated");
  } catch (e) {console.log("...... generateReport ERROR: "+e.message);}
}
exports.generateReportOld=_generateReport;

/**
 * Function will send Mail to defined mail address.
 * @param {type} filename is file name
 * @param {type} filenamepath is file path
 * @param {type} mailsubject is mail subject
 * @param {type} mailtext is mail text
 * @param {type} mailto is recipients (multiple recipients are separated by a comma)
 * @param {type} cc is carbon copied recipients
 * @param {type} host is smtp host address
 * @param {type} secure is None, STARTTLC or SSL
 * @param {type} port is smtp port
 * @param {type} user is user name
 * @param {type} pass is user password
 * @param {type} from is sender mail address
 * @param {type} usedevice enables usage device smtp settings
 * @returns {undefined}
 */
function _sendMail(filename, filenamepath, mailsubject, mailtext, mailto, cc, host, secure, port, user, pass, from, usedevice) {
  try {
    if (usedevice === 1) {
        var pole = _getMailServerSeting();
        if (pole) {
            // device smtp setting readed
            if (pole.host) {
                host = pole.host;
            }
            if (pole.user) {
                user = pole.user;
            }
            if (pole.password) {
                pass = pole.password;
            }
            if (pole.port) {
                port = pole.port;
            }
            if (pole.from) {
                from = pole.from;
            }
            if (pole.tls === 'on') {
                secure = 'STARTTLS';
            }
        }
    }
    var email = require("emailjs/email");
    var options = {
        host:    host,
        port:    port
    };
    if (secure === 'SSL') {
        options.ssl = true;
        options.auth = {
            user:    user,
            password:pass
        };
    }
    else if (secure === 'STARTTLS') {
        options.tls = true;
        options.auth = {
            user:    user,
            password:pass
        };
    }
    else {
        options.user = user;
        options.password = pass;
    }
    var server  = email.server.connect(options);
    var message = {
       text:    mailtext, 
       from:    from, 
       to:      mailto,
       cc:      cc,
       subject: mailsubject,
       attachment: [{
            path:filenamepath, 
            name:filename
       }]
    };
    // send the message and get a callback with an error or details of the message that was sent
    server.send(message, function(err, message) {
        if (err) {
            console.log("...... sendMail ERROR: "+err);
        }
        else {
            console.log("...... sendMail sended");
//            console.log(err || message);
        }
    });
  } catch (e) {console.log("...... sendMail ERROR: "+e.message);}
}

/**
 * Function will send Mail to defined mail address.
 * @param {type} filename is file name
 * @param {type} filenamepath is file path
 * @param {type} mailsubject is mail subject
 * @param {type} mailtext is mail text
 * @param {type} config is json structure for mail settings
 * @returns {undefined}
 */
function _sendMailJson(filename, filenamepath, mailsubject, mailtext, config) {
    _sendMail(filename, filenamepath, mailsubject, mailtext, config.to, config.cc, config.host, config.secure, config.port, config.user, config.pass, config.from, config.usedevice);
}

///----new based on nodemailer

function _sendMailNodemailer(filename, filenamepath, mailsubject, mailtext, mailto, cc, host, secure, auth, port, user, pass, from, usedevice) {
  try {
    if (usedevice === 1) {
        var pole = _getMailServerSeting();
        if (pole) {
            // device smtp setting readed
            if (pole.host) {
                host = pole.host;
            }
            if (pole.user) {
                user = pole.user;
            }
            if (pole.password) {
                pass = pole.password;
            }
            if (pole.port) {
                port = pole.port;
            }
            if (pole.from) {
                from = pole.from;
            }
            if (pole.tls === 'on') {secure = 'true';}
            if (pole.tls === 'off') {secure = '';}
            if (pole.tls === 'false') {secure = '';}
            if (pole.tls_starttls === 'on') {secure = '';} // v msmtp.conf musi pro zapnuti starttls byt zapnuty i tls a v node NESMI !!!
            if (pole.auth === 'login') {auth= 'LOGIN';}
            if (pole.auth === 'plain') {auth= 'PLAIN';}
            if (pole.auth === 'off') {auth= 'OFF';}
        }
    }else {
	  if (secure === 'off') {secure = '';}
	  if (secure === 'false') {secure = '';} //nechapu proc nejde false
    }
    
    
    var nodemailer = require('nodemailer');
    
    var smtpConfig = {
      host: host,
      port: port,
      secure: secure, // use SSL    
      authMethod: auth,
      requiresAuth: true,
      secureConnection: false,
      auth: {
         user: user,
         pass: pass
      },
      tls: {
	rejectUnauthorized: false
      },
      logger: false, // log to console
      debug: false // include SMTP traffic in the logs
    };
    console.log(JSON.stringify(smtpConfig));
    
    var transporter = nodemailer.createTransport(smtpConfig);

    message = {
	from: from, // listed in rfc822 message header
	to: mailto, // listed in rfc822 message header
	cc: cc,
	// Subject of the message
	subject: mailsubject, //
	// plaintext body
	text: mailtext,
	
	attachments: [
	{
	    filename: filename,
	    path: filenamepath,
	    cid: 'cid1@myscada.org' // should be as unique as possible
	}]
    }
    transporter.sendMail(message, function (error, info) {
      if (error) {
	  console.log('Error occurred');
	  console.log(error.message);
	  return;
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
    });
    
  }catch (e) {console.log("...... sendMail ERROR: "+e.message);}
}


function _sendMailJsonNodemailer(filename, filenamepath, mailsubject, mailtext, config) {
    _sendMailNodemailer(filename, filenamepath, mailsubject, mailtext, config.to, config.cc, config.host, config.secure, config.auth, config.port, config.user, config.pass, config.from, 0);
}

exports.sendMail=_sendMailNodemailer;
exports.sendMailJson=_sendMailJsonNodemailer;

function _getMailServerSeting() {
    try {
        var pole = new Object();
        var _file;
        if (__mySCADAConfig.os=="LINUX") {_file = '/etc/myscada/msmtp.conf';}
        if (__mySCADAConfig.os=="APPLE") {_file = '/Applications/mySCADA.app/Contents/myscada/conf/msmtp.conf';}
        if (__mySCADAConfig.os=="BOX") {_file = '/etc/msmtprc';}
        if (__mySCADAConfig.os=="WINDOWS") {_file = 'C:/ProgramData/mySCADA/msmtp.conf';}
        if (__mySCADAConfig.os=="RASPI") {_file = '/etc/myscada/msmtp.conf';}

        fs = require('fs');
        if (fs.existsSync(_file)) {
            var content = fs.readFileSync(_file,"binary");
            if (content) {
                var lines = "";
                if (__mySCADAConfig.os=="WINDOWS") {
                    lines = content.toString().split("\r\n");
                }
                else {
                    lines = content.toString().split("\n");
                }
                for (var i=0; i<lines.length; i++) {
                    var words = lines[i].split(" ", 2);
                    if (words && words.length==2) {
                        var key = words[0];
                        var value = lines[i].substring(words[0].length+1);
                        pole[key] = value;
                    }
                }
            }
        }
    } catch (e) {console.log(e);}
    return pole;
}
exports.getMailServerSeting=_getMailServerSeting;

function _readSMS() {
	if (connect_modemmaster==1) {
			writestring='{"t" : 54}\n';
			//console.log(">"+writestring+"<");
			client_modemmaster.write(writestring);
			__myevent.on("r54", function (data) {
				var dataj=JSON.parse(data);
				if (dataj['s']==0) {var status=0;} else {var status=1;}
				try {__myevent.removeAllListeners('r54')} catch (e) {console.log(e);};
				if ( dataj['d']['Timestamp']> __sms_last_timestamp) {
					__sms_last_timestamp=dataj['d']['Timestamp'];
					if (sms_list.length >= __sms_array_max_length) {
						sms_list.shift();
						sms_list.push(dataj);
					} else {sms_list.push(dataj);}
				}
			});
	} else {/*console.log("MODEMMASTER not connect");*/}
}



function _printSMSArray() {
	//console.log(sms_list.length);
	for (i=0;i<sms_list.length;i++) {
		console.log(i+" "+sms_list[i]['d']['Timestamp']+" "+sms_list[i]['d']['From']+" "+sms_list[i]['d']['Text']);
	}
	
}
exports.printSMSArray=_printSMSArray;


function __insertDlg(_datalogname,_time,_timems,_pole,callback) {
	if (connect_log==1) {
		var __type=__getDatalogNameType(_datalogname);
		if (__type == 1) {
			var _size=__getDatalogNameSize(_datalogname);
			if (_size == _pole.length) {
			    var dlgid=__getDatalogId(_datalogname);
			    dlgid=dlgid; //Matej cisluje od 0 !!!
			    var pole_str=_pole.toString().replace(/\,/g,'|');
			    writestring="t=21&prj="+__projectID+"&dlgID="+dlgid+"&d="+_time+"|"+_timems+"|"+pole_str+"|\3";
			    console.log(writestring);
			    client_log.write(writestring);
			    callback(1);
			} else { console.log("Array to write have bad size !!");callback(0);}
		} else { console.log("Datalog is not script type");callback(0);}
	} else {callback(0);}
};

exports.insertDlg=__insertDlg;


function __keepAliveDlg() {
	if (connect_log==1) {
			    writestring="keepalive\3";
			    log(writestring);
			    client_log.write(writestring);
	}
};
exports.keepAliveDlg=__keepAliveDlg;

function __reboot() {
	 {
			    writestring="t=99&cmd=reboot\3";
			    log(writestring);
                            __getRequest(false,writestring,function (err,data){
                            });
			    
	}
};
exports.reboot=__reboot;

//NEW MYSCADA.JS - NOVA SJEDNOCENA NODE A VIEW SCRIPT VERZE
var __http = require('http');
//var __http2 = require('http');
var __http_server=__http.createServer(function (req, res) {
    var body = [];
    req.on('error', function(err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(""); 
    });
          
    req.on('data', function(chunk) {
            body.push(chunk);
    });
    
    req.on('end', function() {
    body = Buffer.concat(body).toString();
            if (this.dataFromViewScripts!=undefined)
        {
            try
            {
            var result=JSON.parse(body);    
            }
            catch (e){
              var  result=body;
            }
            
            this.dataFromViewScripts(result,function(navrat) {
				if (navrat!=undefined)
				{
                                  if (typeof navrat === 'string' || navrat instanceof String)
                                  {
                                      
                                  }
                                  else
                                  {
                                      navrat=JSON.stringify(navrat);
                                  }
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end(navrat);
				//res.end("Hello World\n");
				}
				else
				{
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end("null"); 
				}
			});
        }
        else
        {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("");
        }
  }.bind(this));
  
    
    
    
}.bind(this));

//handler kodu z view scriptu
__http_server.on('error', function (e) {
  // Handle your error here
  //console.log(e);
});
//__http_server.listen(8888, "127.0.0.1");


function __readAlarmsHistory(options,callback)
{
	if (options.filters==undefined)
  {
  var json=JSON.stringify({filters: []});
  }
  else
  {
  var json=JSON.stringify({filters: options.filters});
  }

  var conf = {
    data: {
      t: 30,
      prj: __projectID,
      json: json,
      seq: 1
    }
  }
  
  if (options['SQLWHERE']!=undefined)
  {
      conf.data['SQLWHERE']=options['SQLWHERE'];
  }
  
  //var noLimit=0; //pokud je nastavena agregace a zaroven cas od a do tak zrusime limit, bude slouzit az u agregacni fce

   // if (options.aggregate!=undefined)
   // {
   //     noLimit++;
   // }
    
  if (options.timeTo!=undefined)
  {
    conf.data.end=options.timeTo;
   // noLimit++;
  }
  if (options.timeFrom!=undefined)
  {
    conf.data.start=options.timeFrom;
  //  noLimit++;
  }
  if (options.limit!=undefined) //&& noLimit<3
  {
    conf.data.limit=options.limit;
  }
  if (options.limitEnd!=undefined) //&& noLimit<3
  {
    conf.data.limitEnd=options.limitEnd;
  }

  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(true,dataout,function (err,data){
   
        if (err)
        {
            callback(err,data);
        }
        else
        {
            
            var data=JSON.parse(data);
            var datajsou=data.d;
            var status=data.s;
            if (status===1)
            {
            //callback(false,datajsou);
                
                if (options.aggregate==="occurence" || options.aggregate==="occurenceTotal")
  		{
                    //najdeme aktivni alarmy pred zacatkem udalosti, a az potom zpracujeme
                    
                    var limit=100;
                    
                    var timeEnd=0;
                    if (options.limitOccurence!==undefined) {limit=options.limitOccurence;}
                    if (options.limitTime!==undefined) {limit=0-options.limitTime;}
                    
                    if (options.timeTo!==undefined) {timeEnd=new Date(options.timeTo*1000);}
                    var timeStart=0;
                    if (options.timeFrom!==undefined) {timeStart=new Date(options.timeFrom*1000);}
                    
                    var limitRowsTo=10000;
                    if (options.limit!==undefined) {limitRowsTo=options.limit;}
                    if (options.limitEnd!==undefined) {limitRowsTo=options.limitEnd;
                    datajsou.reverse();
                    }
                    
                    getActiveTimeUpToInterval(timeStart,options.severity,function (activeAlarms){
                    
                         var occTotal=false;
                         var limitJe=datajsou.length;
                         try
                         {
                         var lastItem=new Date(datajsou[datajsou.length-1].cell.atm[0]*1000+Math.floor(datajsou[datajsou.length-1].cell.atm[1]/1000));
                         }catch (e){lastItem=null;}
                         
                         if (options.aggregate==="occurenceTotal") occTotal=true;
                         datajsou=alarmsOccurence(datajsou,limit,timeEnd,options.severity,options.aggregateGroups,occTotal,timeStart,activeAlarms,limitRowsTo);
                         
                         //doplnime nazvy alarmu
                         if (options.aggregate==="occurence")
                         {
                             datajsou=processLanguageForAlarms(datajsou,options.language);
                             callback(false,datajsou,limitJe,lastItem);
                         }
                         else
                         {
                          callback(false,datajsou,limitJe,lastItem);
                         }
                         
                    });
                   
                    
                }
                else
                {
                    datajsou=processLanguageForAlarms(datajsou,options.language);
                    if (options.export===undefined)
                    {
                        for (i=0;i<datajsou.length;i++)
                        {
                            if (datajsou[i].cell!==undefined)
                            {
                                 if (datajsou[i].cell.atm!==undefined) datajsou[i].cell.acttime=new Date(datajsou[i].cell.atm[0]*1000+Math.floor(datajsou[i].cell.atm[1]/1000));
                                 if (datajsou[i].cell.dtm!==undefined) datajsou[i].cell.deacttime=new Date(datajsou[i].cell.dtm[0]*1000+Math.floor(datajsou[i].cell.dtm[1]/1000));
                                 if (datajsou[i].cell.acktm!==undefined) datajsou[i].cell.acktime=new Date(datajsou[i].cell.acktm[0]*1000+Math.floor(datajsou[i].cell.acktm[1]/1000));
                            }
                        }
                        callback(false,datajsou,datajsou.length);
                    }
                    else if (options.export.type=='CSV')
                    {
                    __saveToCSV(datajsou,options,callback);
                    }
                    else
                    {                
                    callback(true,datajsou);
                    }
                }
            }
            else
            {
            callback(true,datajsou);
            }
        }
    });
}
exports.readAlarmsHistory=__readAlarmsHistory;

function processLanguageForAlarms(result,language)
{
    for (i=0;i<result.length;i++)
      {
        var id=result[i].id;
        try
        {
        result[i].cell.msg=__alarmMessages[id]['default']; //Message
        result[i].cell.dev=__alarmDevice[id]['default']; //Device field
        result[i].cell.area=__alarmArea[id]['default']; //Area field
        result[i].cell.sv=__alarmSeverity[id]; //Area field
        }
        catch (e)
        {
        result[i].cell.msg=""; //Message
        result[i].cell.dev=""; //Device field
        result[i].cell.area=""; //Area field
        result[i].cell.sv=0; //Area field
        }
        
        
        if (language!=undefined)
        {
            
            if (__alarmMessages[id]!=undefined && __alarmMessages[id][language]!=undefined)
            {
               result[i].cell.msg=__alarmMessages[id][language];
            }
            if (__alarmArea[id]!=undefined && __alarmArea[id][language]!=undefined)
            {
               result[i].cell.area=__alarmArea[id][language];
            }
            if (__alarmDevice[id]!=undefined && __alarmDevice[id][language]!=undefined)
            {
               result[i].cell.dev=__alarmDevice[id][language];
            }
        }
    }
    return result;
}


function __readAlarmsOnline(options,callback)
{
	  if (options.filters==undefined)
  {
  var json=JSON.stringify({filters: []});
  }
  else
  {
  var json=JSON.stringify({filters: options.filters});
  }

  if (options.severity==undefined)
  {
    var sev=999999;
  }
  else
  {
    var sev=options.severity;
  }

  var conf = {
    data: {
      t: 10,
      prj: __projectID,
      sev: sev,
  //    json: json,
   //   seq: 1
    }
  }

  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(false,dataout,function (err,data){
        if (err)
        {
            callback(err,data);
        }
        else
        {
            var data=JSON.parse(data);
            var datajsou=data.d;
            
            if (options.language!== undefined)
            {
            datajsou=processLanguageForAlarms(datajsou,options.language);
            }
                
                
                if (options.export==undefined)
  		{
                    for (i=0;i<datajsou.length;i++)
                    {
                    datajsou[i].cell.acttime=new Date(datajsou[i].cell.atm[0]*1000+Math.floor(datajsou[i].cell.atm[1]/1000));
                    datajsou[i].cell.deacttime=new Date(datajsou[i].cell.dtm[0]*1000+Math.floor(datajsou[i].cell.dtm[1]/1000));
                    datajsou[i].cell.acktime=new Date(datajsou[i].cell.acktm[0]*1000+Math.floor(datajsou[i].cell.acktm[1]/1000));
                    }
                callback(false,datajsou);
            	}
            	else if (options.export.type=='CSV')
            	{
            	__saveToCSV(datajsou,options,callback);
            	}
                else
                {                
        	callback(true,datajsou);
                }
        }
    });
}
exports.readAlarmsOnline=__readAlarmsOnline;

function getActiveTimeUpToInterval(time, severityMax, callback)
{
    
    var severity=-1;
 if (severityMax !== undefined && !isNaN(severityMax))
 {
     severity=Number(severityMax);
 }
 
 
    //read historical alarm data 
var xx={};
//options['timeFrom']=new Date()/1000-60*60;
xx['timeTo']=time/1000;
xx['limitEnd']=10000;
    __readAlarmsHistory(xx, function(err,result)
    {
        var activeAlarms=[];
        
        if (!err)
        {
            //process each row of returned data
            for (var i=(result.length-1);i>0;i--)
            {
              var status=result[i].cell.stat; //Alarms status
              var id=result[i].id;
              
              var sev=__alarmSeverity[id];
              if (severity>=0 && sev>severity) {continue;}
              
              if (status===1)
              {
                  var index = activeAlarms.indexOf(id);
                  if (index === -1) {
                    activeAlarms.push(id);
                  }
              }
              else if (status===0)
              {
                  var index = activeAlarms.indexOf(id);
                    if (index > -1) {
                        activeAlarms.splice(index, 1);
                    }
              }
            }
        }
        
        callback(activeAlarms);
    });
}


function alarmsOccurenceCountPart(result,limitRes,endTime,severity,total,activeAlarms,startTime)
{
    var activeAlarmsCount=activeAlarms.length;
    var totalAlarmTime=0;
    var lastAlarmTime=startTime.getTime();
    
   
    
    var pole=new Array();
    var poleAct=new Array();
    //nastavime init pro aktivni alarmy
    var keys=Object.keys(activeAlarms);
    keys.forEach(function(id)   
    {
        id=parseInt(id);
        if (id>0)
        {
        poleAct[id]=startTime.getTime();
                    var retval=new Object();
                    retval.cell=new Object();
                   // retval.id=result[i].id;
                    retval.id=id;
                   // retval.cell.msg=result[i].cell.msg;
                   // retval.cell.area=result[i].cell.area;
                   // retval.cell.dev=result[i].cell.dev;
                   // retval.cell.sv=result[i].cell.sv;
                    retval.cell.count=1;
                    retval.cell.time=new Date();
                    retval.cell.time.setTime(0);
                    pole[id]=retval;
        }
    });
    
    
 
    for (i=0;i<result.length;i++)
    {              
        var id=result[i].id;
        if (severity >=0)
        {
            //var sev=result[i].cell.sv;
            var sev=__alarmSeverity[id];
            if (sev>severity) continue;
        }
         
        if (result[i].cell.stat===1) //alarm activation
            {
                var index = activeAlarms.indexOf(id);
                if (index === -1) {
                    activeAlarms.push(id);
                }
                
                poleAct[id]=result[i].cell.atm[0]*1000+Math.floor(result[i].cell.atm[1]/1000);
                
                if (activeAlarmsCount>0)
                {
                    totalAlarmTime=totalAlarmTime+(poleAct[id]-lastAlarmTime);
                }
                
                activeAlarmsCount++;
                lastAlarmTime=poleAct[id];
                
                if (poleAct[id]<startTime.getTime()) {poleAct[id]=startTime.getTime()}
                if (pole[id]===undefined)
                    {
                    var retval=new Object();
                    retval.cell=new Object();
                   // retval.cell.msg=result[i].cell.msg;
                   // retval.cell.area=result[i].cell.area;
                   // retval.cell.dev=result[i].cell.dev;
                   // retval.cell.sv=result[i].cell.sv;
                   
                       retval.id=id;
                   
                    retval.cell.count=1;
                    retval.cell.time=new Date();
                    retval.cell.time.setTime(0);
                    pole[id]=retval;
                    }
                    else
                    {
                    pole[id].cell.count=pole[id].cell.count+1;
                    }
            }
            else  if (result[i].cell.stat===0) //alarm deactivation
            {
                var index = activeAlarms.indexOf(id);
                if (index > -1) {
                    activeAlarms.splice(index, 1);
                }
                var dtm=result[i].cell.dtm[0]*1000+Math.floor(result[i].cell.dtm[1]/1000);
                //if (activeAlarmsCount>0)
                //{
                    totalAlarmTime=totalAlarmTime+(dtm-lastAlarmTime);
                //}
                lastAlarmTime=dtm;
                
                activeAlarmsCount--;
                
                poleAct[id]=0;
                if (pole[id]!==undefined)
                    {
                       var acttime=result[i].cell.atm[0]*1000+Math.floor(result[i].cell.atm[1]/1000); //Activation time
                       if (acttime<startTime) {acttime=startTime;}
                       var deacttime=result[i].cell.dtm[0]*1000+Math.floor(result[i].cell.dtm[1]/1000); //Deactivation time 
                       var diffinms=deacttime-acttime;
                       pole[id].cell.time.setTime(pole[id].cell.time.getTime()+diffinms);
                    }
            }
        }
        
            if (endTime.getTime()>0)
            {
                if (endTime>(new Date())) {endTime=new Date();}
                var keys=Object.keys(poleAct);
                keys.forEach(function(id)   
                {
                if (poleAct[id]>0)
                    {
                        var diffinms=endTime.getTime()-poleAct[id];
                        pole[id].cell.time.setTime(pole[id].cell.time.getTime()+diffinms);
                    }
                });
                
                if (activeAlarmsCount>0)
                {
                    totalAlarmTime=totalAlarmTime+(endTime-lastAlarmTime);
                }
            }
            
            function compare(a,b)
            {
             return b.cell.count-a.cell.count;
            } 
            
            function compare2(a,b)
            {
             return b.cell.time.getTime()-a.cell.time.getTime();
            } 
            
            if (limitRes>0)
            {
            pole.sort(compare);
            }
            else
            {
                limitRes=0-limitRes;
                limitRes=limitRes*1000;
                pole.sort(compare2);
            }
        
            
            var ret=new Array();
            var pocet=0;
            pole.forEach(function(s)
            {
            if (pocet<limitRes)
            ret.push(s);
            pocet++;
            });     
            
            
            if (total)
            {
                        var count=0;
                        var time=new Date(0);
                        var val=null;
                        if (ret.length>0) {val=ret[0];}
                        
                        for (var i=0;i<ret.length;i++)
                        {
                            var r=ret[i];
                            var cnt=r.cell.count;
                            var t=r.cell.time;
                            count=count+cnt;
                            var tt=t.getTime()+time.getTime();
                            time=new Date(tt);  
                        }
                        var d=new Date(totalAlarmTime);
                        var data={cnt:count, timeSum:time, time: d, val: val};
                        return {data: data, activeAlarms: activeAlarms};    
            }
            else
            {
            return ret; 
            }
}

function alarmsOccurence(result,limitRes,endTime,severityMax,intervalsKeyed,total,startTime,activeAlarms1,limitRowsTo)
{
 //var activeAlarms=[]; //pole alarmu ktere jsou zrovna aktivni]
 //todo dodelat vycteni aktivnich alarmu, prohledanim historie pred zacatkem nacitani

 var severity=-1;
 if (severityMax !== undefined && !isNaN(severityMax))
 {
     severity=Number(severityMax);
 }
    
    if (intervalsKeyed===undefined)
    {
        return alarmsOccurenceCountPart(result,limitRes,endTime,severity,total,activeAlarms1,startTime);
    }
    else
    {
            var vysledek={};
            var aktDateIndex=0;
            //pripravime si pole s pomocnymi daty
            var pomArrays=[];
             //prochazime vsechny vysledky
             
             var activeAlarms=[];
             if (activeAlarms1!==undefined && activeAlarms1.length!==undefined && activeAlarms1.length>0)
             {
                 activeAlarms=activeAlarms1;
             }
                            for (i=0;i<result.length;i++)
                            {
                              var acttime=new Date(result[i].cell.atm[0]*1000+Math.floor(result[i].cell.atm[1]/1000));
                              var deacttime=new Date(result[i].cell.dtm[0]*1000+Math.floor(result[i].cell.dtm[1]/1000));
                              var date=acttime;
                              if (deacttime>acttime) {date=deacttime;}
                                      
                              if (i===0)
                              {
                                  for (var m=aktDateIndex;m<intervalsKeyed.length;m++)
                                  {
                                      if (intervalsKeyed[aktDateIndex].d>date) 
                                      {
                                          aktDateIndex=m;
                                            break;
                                        }
                                   }
                                   
                                   if (activeAlarms.length>0)
                                   {
                                        for (var kk=0;kk<aktDateIndex;k++)
                                         {
                                       // provedeme  agregaci a ulozime vysledky
                                                   var dateIs=intervalsKeyed[kk].d;
                                                   var start=startTime;
                                                   if (aktDateIndex>0){start=intervalsKeyed[kk-1].d}
                                                         var arr=alarmsOccurenceCountPart(pomArrays,limitRes,dateIs,severity,true,activeAlarms,start);
                                                         pomArrays=[];
                                                         if (arr!==undefined)
                                                         {
                                                            activeAlarms=arr.activeAlarms;
                                                            vysledek[dateIs]=arr.data; 
                                                         }
                                         }
                                    }
                              }
                              
                              
                              
                              //kontrola zda nejsme za koncem pole pro jistotu
                              if (intervalsKeyed[intervalsKeyed.length-1].d<date) 
                              {
                                    break;
                                }

                                var newInterval=false;
                                
                                if (intervalsKeyed[aktDateIndex].d<=date)
                                {
                                    newInterval=true;
                                }
                                //mame posledni zaznam tak uzavreme interval
                                          if (i===(result.length-1) && limitRowsTo!==result.length)
                                          {
                                              newInterval=true;
                                          }
                              //zkontrolujeme zda nepotrebujeme novy interval
                              //zacatek intervalu je [ tedy vcetne pocatecni hodnoty
                                 //proto je zde <=
                              if (newInterval)
                              {
                                        //if (pomArrays.length>0) 
                                        //zpracujeme vzdy, pro pripad ze by byli nejake aktivni alarmy z milula
                                        {
                                              // provedeme  agregaci a ulozime vysledky
                                              var dateIs=intervalsKeyed[aktDateIndex].d;
                                              var start=startTime;
                                              if (aktDateIndex>0){start=intervalsKeyed[aktDateIndex-1].d}
                                                    var arr=alarmsOccurenceCountPart(pomArrays,limitRes,dateIs,severity,true,activeAlarms,start);
                                                    if (arr!==undefined)
                                                    {
                                                       activeAlarms=arr.activeAlarms;
                                                       vysledek[dateIs]=arr.data; 
                                                    }
                                         }
                                       pomArrays=[]; //vycistime pole na dalsi posun
                                        //konec intervalu je ) tedy bez koncove hodnoty
                                        //proto je zde <
                                        aktDateIndex++;
                                        
                                         while(intervalsKeyed[aktDateIndex]!==undefined && intervalsKeyed[aktDateIndex].d!==undefined && intervalsKeyed[aktDateIndex].d<=date) 
                                        {
                                            if (activeAlarms.length>0)
                                            {
                                            // provedeme  agregaci a ulozime vysledky
                                              var dateIs=intervalsKeyed[aktDateIndex].d;
                                              var start=startTime;
                                              if (aktDateIndex>0){start=intervalsKeyed[aktDateIndex-1].d}
                                                    var arr=alarmsOccurenceCountPart(pomArrays,limitRes,dateIs,severity,true,activeAlarms,start);
                                                    if (arr!=undefined)
                                                    {
                                                       activeAlarms=arr.activeAlarms;
                                                       vysledek[dateIs]=arr.data; 
                                                    }
                                            }
                                            aktDateIndex++; 
                                        }

                                }
                                    

                            if (intervalsKeyed[aktDateIndex]!==undefined && intervalsKeyed[aktDateIndex].d!==undefined && intervalsKeyed[aktDateIndex].b)
                              {
                                  pomArrays.push(result[i]);
                              }

                         }
        return vysledek;
    }
 
//return pole;
}

function __readUserActions(options,callback)
{
    
    
    var conf = {
    data: {
      t: 32,
      prj: __projectID,
      seq: 1
    }
  }
  
  if (options.timeTo!=undefined)
  {
    conf.data.end=options.timeTo;
  }
  if (options.timeFrom!=undefined)
  {
    conf.data.start=options.timeFrom;
  }
  if (options.limit!=undefined)
  {
    conf.data.limit=options.limit;
  }
  if (options.limitEnd!=undefined)
  {
    conf.data.limitEnd=options.limitEnd;
  }
  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(true,dataout,function (err,data){
        if (err)
        {
            callback(err,data);
        }
        else
        {
            var data=JSON.parse(data);
            var datajsou=data.d;
            for (i=0;i<datajsou.length;i++)
                    {
                    datajsou[i].cell.datetime=new Date(result[i].tm[0]*1000+Math.floor(result[i].tm[1]/1000));
                    }
            
            callback(err,datajsou);
        }
    });
}
exports.readUserActions=__readUserActions;

function __readDatalogData(options,callback)
{
	if (options.filters==undefined)
  {
  var json=JSON.stringify({filters: []});
  }
  else
  {
  var json=JSON.stringify({filters: options.filters});
  }

  var conf = {
    data: {
      t: 31,
      prj: __projectID,
      tags: options.dlgid+"|"+options.tags,
      json: json,
      seq: 1
    }
  }

  if (options.timeTo!=undefined)
  {
    conf.data.end=options.timeTo;
  }
  if (options.timeFrom!=undefined)
  {
    conf.data.start=options.timeFrom;
  }
  if (options.limit!=undefined)
  {
    conf.data.limit=options.limit;
  }
  if (options.limitEnd!=undefined)
  {
    conf.data.limitEnd=options.limitEnd;
  }

  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(true,dataout,function (err,data){
        if (err)
        {
            callback(err,data);
        }
        else
        {
            try{
            var data=JSON.parse(data);
            var datajsou=data.d[options.dlgid].d;
            var status=data.s;
            if (status===1)
            {
            	if (options.export==undefined)
  		{
                    var offset=0;
                    if (options.timeZone!==undefined)
                    {
                        var moment = require('moment-timezone');

                            if (moment.tz.zone(options.timeZone)!==null)
                                        {
                                            var zone = moment.tz.zone(options.timeZone);
                                            if (datajsou.length>0)
                                            {
                                                var d=new Date(datajsou[0].tm[0]*1000+Math.floor(datajsou[0].tm[1]/1000));
                                                offset=zone.parse(d); // 240 
                                            }
                                             
                                        }
                    }
                    
                    
                    for (i=0;i<datajsou.length;i++)
                    {
                        var d=new Date(datajsou[i].tm[0]*1000+Math.floor(datajsou[i].tm[1]/1000));
                        if (offset!==0)
                        {
                        var time=d.getTime()+offset*60*1000;
                        var dd=new Date(time);
                        datajsou[i].datetime=dd;
                        }
                        else
                        {
                        datajsou[i].datetime=d;
                        }
                    }
                    callback(false,datajsou);
            	}
            	else if (options.export.type=='CSV')
            	{
            	__saveToCSV(datajsou,options,callback);
            	}
            }
            else
            {
            callback(true,datajsou);
            }
        } catch (e) {callback(true,e);}
        }
    }.bind({ options: options }));
}
exports.readDatalogData=__readDatalogData;



function __saveToCSV(datajsou,options,callback)
{
    try{
            		var fs = require('fs');
            		var filename=options.export.file;
            		var ff=getFilename(filename);
            		var separator=';';
            		var format='YYYY-MM-DD, h:mm:ss';

            		if (options.export.dateformat!=undefined)
  					{
						format=options.export.dateformat;
  					}
            		if (options.export.separator!=undefined)
  					{
  						separator=options.export.separator;
  					}
            		if (options.export.append==true)
            		{
            			if (fs.existsSync(ff)) {
            				var mode="a";
            			}
            			else
            			{
            				var mode="w";
            			}
            		}
            		else
            		{
            			var mode="w";
            		}



        			var f = fs.openSync(ff, mode);

        			//hlavicka
        			if (options.export.headers!=undefined)
  					{
  						var headers=options.export.headers;
  						var radek=headers[0];
  						for (i=1;i<headers.length;i++)
  						{
  							radek=radek+separator+headers[i];
  						}
  						radek=radek+"\n";
  						var bout = new Buffer(radek, 'utf8');
  						fs.writeSync(f, bout, 0, bout.length);
  						delete(bout);
  					}
  					//data
  					var radek="";
                                        var klice=options.tags;
                                        
                                        if (options.tags==undefined)
                                        {
                                            klice=options.export.keys;
                                        }
                                        
  					for (var i=0;i<datajsou.length;i++)
					{
                                            radek="";
                                            if (options.tags!=undefined)
                                                {
						radek="\""+getDateAsString(datajsou[i].tm,format)+"\"";
                                                }
                                                
						for (var j=0;j<klice.length;j++)
						{
                                                    if (datajsou[i].cell!=undefined)
                                                    {
                                                        var val=datajsou[i].cell[klice[j]]; 
                                                    }
                                                    else
                                                    {
                                                    var val=datajsou[i][klice[j]]; 
                                                    }
                                                    
                                                    if (radek.length>1) radek=radek+separator;
                                                    
							if ( typeof val === 'string')
							{
								radek=radek+"\""+val+"\"";
							}
                                                        else if (val!=undefined && val.constructor!=undefined && val.constructor == Array)
							{
								radek=radek+"\""+getDateAsString(val,format)+"\"";
							}
                                                        else if (val instanceof Date)
							{
                                                            var moment = require('moment');
                                                            var casje=moment(val);
                                                            var val2=casje.format(format);
                                                            radek=radek+"\""+val2+"\"";
								
							}
							else
							{
							radek=radek+val;
							}
						}
						radek=radek+"\n";
						var bout = new Buffer(radek, 'utf8');
                                                fs.writeSync(f, bout, 0, bout.length);
                                                delete(bout);
					}
					fs.closeSync(f);
        			callback(false);
        			return;
        			}
        			catch (e) {
        console.log(e)                            
        callback(true);return;}
}


function __readTags(table,callback)
{
    try{
    //vycteme poprve a tim zaregistujeme tag request
    __readTagsInt(table,false, function (err,data)
            {
                if (err)
                {   //pokud jsme nevycetli vycteme podruhe rychle
                    setTimeout(function() { 
                    __readTagsInt(table, false, function (err,data)
                        {
                            if (err)
                            {
                                 //a pokud nevycteme ani podruhe tak nacteme potreti ale pomalu
                                setTimeout(function() { 
                                __readTagsInt(table,false,callback);
                                }, 1000);
                            }
                            else
                            {
                                callback(err,data);
                            }
                        }
                    );
            
                    }, 143);
                }
                else
                {
                    callback(err,data);
                }
            }
            );
    }
    catch (e)
    {
        callback(true,"Generic error: "+e.message);
    }
}

function __readTagsSymbolic(table,callback)
{
    try
    {
    //vycteme poprve a tim zaregistujeme tag request
    __readTagsInt(table,true, function (err,data)
            {
                if (err)
                {   //pokud jsme nevycetli vycteme podruhe rychle
                    setTimeout(function() { 
                    __readTagsInt(table, true, function (err,data)
                        {
                            if (err)
                            {
                                 //a pokud nevycteme ani podruhe tak nacteme potreti ale pomalu
                                setTimeout(function() { 
                                __readTagsInt(table,true,callback);
                                }, 1000);
                            }
                            else
                            {
                                callback(err,data);
                            }
                        }
                    );
            
                    }, 143);
                }
                else
                {
                    callback(err,data);
                }
            }
            );
    
    }
    catch (e)
    {
        callback(true,"Generic error: "+e.message);
    }
}

exports.readTagsSymbolic=__readTagsSymbolic;

function __readTagsInt(table,symbolic,callback)
{
    try
    {
    //var trqc=__convertlist[table]['alias'];
    //var options=new Object();
    var tn=__getTable(table);
    var trqc=tn.readID; // request id
    
    var conf = {
    data: {
      t: 0,
      prj: __projectID,
      rq: trqc
    }
    }
  
  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(false,dataout,function (err,data){
        if (err)
        {
            callback(err,data);
        }
        else
        {
           
           try
           {
            var data=JSON.parse(getJSONValidString(data));
            }
            catch (e)
            {
                callback(true,"Error: "+e.message+ " On data:"+data);
                return;
            }
            
            var pomlist=Object.keys(data);
            var trqc=pomlist[0];
            var ret=data[trqc].t; //tagy
            
            if (ret==undefined)
            {
            callback(true,data);
            return;    
            }
            
            var status=data[trqc].ts; //status tagu
            var err=true; //status message
            if (data[trqc].s!=undefined && data[trqc].s==1) {err=false;}
            
            if (symbolic)
            {
                var tn;
                for (var i=0;i<__tablesNew.length;i++)
                {
                   if (__tablesNew[i].name==table)
                   {
                       tn=__tablesNew[i];
                       break;
                   }
                }
                //var conn_type=__connectionsTypes[tn.connection];
                var keys=tn.tags;
                var indexy=Object.keys(tn.tags);
            }
            
            var retval=[];
            for (var tt=0;tt<ret.length;tt++)
            {
                if (symbolic)
                {
                    retval[keys[indexy[tt]].name]=new Object();
                    retval[keys[indexy[tt]].name].err=err;
                    if (ret[tt].length==1)
                    {
                        retval[keys[indexy[tt]].name].value=ret[tt][0]; 
                    }
                    else
                    {
                        retval[keys[indexy[tt]].name].value=ret[tt];
                    }
                }
                else
                {
                    retval[tt]=new Object();
                    retval[tt].err=err;
                    if (ret[tt].length==1)
                    {
                        retval[tt].value=ret[tt][0]; 
                    }
                    else
                    {
                        retval[tt].value=ret[tt];
                    }
                }
                
            }
            
            if (status!=undefined && !err)
            {
            for (var tt=0;tt<status.length;tt++)
            {
                if (symbolic)
                {
                    if (status[tt]==1)
                    retval[keys[indexy[tt]].name].err=false;
                    else
                    retval[keys[indexy[tt]].name].err=true;
                }
                else
                {
                    if (status[tt]==1)
                    retval[tt].err=false;
                    else
                    retval[tt].err=true;
                }
                
            }
            }
            
            callback(err,retval);
        }
    }.bind({ table: table })); //.bind({ table: table }));
    
    }
    catch (e)
    {
        callback(true,"Generic error: "+e.message);
    }
}
exports.readTags=__readTags;

function __loadScriptTable(name,callback)
{
        var fs = require('fs');
        var f=getFilename('persistance_save/'+ name+".json");
        if (!fs.existsSync(f)){
            callback(true,"Saved state does not exist.")
        }
        else
        {
            var data = fs.readFileSync(f, 'utf8');
            var options=JSON.parse(data);
            __writeTags(options,function(err)
                    {
                        callback(err);
                    }
                );
        }
        
            
            
}
exports.loadScriptTable=__loadScriptTable;

function __saveScriptTable(name,callback)
{
    __readTagsInt(name,false,function (err,data){
        if (err)
        {
            callback(true);
        }
        else
        {   
            var vals="";
            var tn;
            for (var i=0;i<__tablesNew.length;i++)
            {
               if (__tablesNew[i].name==name)
               {
                   tn=__tablesNew[i];
                   break;
               }
            }
           var conn_type=__connectionsTypes[tn.connection];
           var keys=Object.keys(tn.tags);
           var obj={};
           obj.values={};
           obj['name']=name;
           for (var i=0;i<keys.length;i++)
           {
              // obj.values[i]={};
                  // if (tn.tags[keys[i]].type=="String")
                  // {
                    ///   obj.values[i][tn.tags[keys[i]].name]="\""+data[i].value+"\"";
                   //}
                  // else
                  // {
                       obj.values[tn.tags[keys[i]].name]=data[i].value;
                  // }
           }
        var dir=getFilename('persistance_save');
        var fs = require('fs');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        
            var f=getFilename('persistance_save/'+ name+".json");
            var obj2=JSON.stringify(obj); 
            fs.writeFileSync(f, obj2 , 'utf-8');
            callback(false);
        }
    });
    
    
}
exports.saveScriptTable=__saveScriptTable;

function __getTable(name)
{
    for (var i=0;i<__tablesNew.length;i++)
  {
     if (__tablesNew[i].name==name)
     {
         return __tablesNew[i];
       
     }
  }
  
  return undefined;
}

function __writeTags(options,callback)
{
  try{
    var o={
         "t":7,
         "wrids":[
               {
		"id":1,
                "d":[]
               }
             ],
         "prj":""
         }
         
  var tn=__getTable(options.name);
  o.wrids[0].id=tn.writeID; //write request id
  o.prj=__projectID;
  var conn_type=__connectionsTypes[tn.connection];
 
 
 
 var keys=Object.keys(tn.tags);
 var index=-1;
 for (var i=0;i<keys.length;i++)
 {
     index++;
     var obj={};
     obj.pos=index;
     
     if (options.values[tn.tags[keys[i]].name]!=undefined)
     {
         if (tn.tags[keys[i]].type=="String" || tn.tags[keys[i]].type=="string")
         {
             if (typeof options.values[tn.tags[keys[i]].name] != 'string')
             {
             callback(true,"Parameter options['values']['"+tn.tags[keys[i]].name+"'] should be a "+ tn.tags[keys[i]].type + " type!");
             return
             }
             
             if (tn.tags[keys[i]].subType==2)
             //if (conn_type==15)
             {
             obj.val=__getArrayFromStringSiemens(options.values[tn.tags[keys[i]].name]);
             }
             else if (conn_type==1000) //databaze
             {
             obj.val=[];
             obj.val.push("\""+options.values[tn.tags[keys[i]].name]+"\"");
             }
             else
             {
             obj.val=__getArrayFromString(options.values[tn.tags[keys[i]].name]);
             }
             
             if (tn.tags[keys[i]].subType==1) //je to rockwell musime pridat info o delce stringu
             {
                 o.wrids[0].d.push(obj);
                 index++;
                 obj={};
                 obj.pos=index;
                 obj.val=[options.values[tn.tags[keys[i]].name].length];
             }
            
         }
         else if (options.values[tn.tags[keys[i]].name].constructor == Array)
         {
             var items=parseInt(tn.tags[keys[i]].number);
             if (options.values[tn.tags[keys[i]].name].constructor !== Array || items!==options.values[tn.tags[keys[i]].name].length)
             {
             callback(true,"Parameter options['values']['"+tn.tags[keys[i]].name+"'] should be a "+ tn.tags[keys[i]].type + " type!");
             return;
             }
             //var s=options.values[tn.tags[keys[i]].name].join('|');
             obj.val=options.values[tn.tags[keys[i]].name];
         }
         else
         {
              if (typeof options.values[tn.tags[keys[i]].name] != 'number')
             {
                 if (isNaN(options.values[tn.tags[keys[i]].name]))
                 {
                     callback(true,"Parameter options['values']['"+tn.tags[keys[i]].name+"'] should be a "+ tn.tags[keys[i]].type + " type!");
                     return;
                 }
                 else
                 {
                     var n=Number(options.values[tn.tags[keys[i]].name]);
                     obj.val=new Array();
                     obj.val.push(n);
                 }
             
             }
             else
             {
             obj.val=new Array();
             obj.val.push(options.values[tn.tags[keys[i]].name]);
            }
         }
         
         o.wrids[0].d.push(obj);
     }
     else
     {
         callback(true,"options[values]."+tn.tags[keys[i]].name+" must exist!");
     return;
     }
     
 }

  var json=JSON.stringify(o);
  var conf = {
    data: {
      t: 7,
      json: json
   //   seq: 1
    }
  }

  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
    //var dataout='end='+params.timeTo+'&start='+params.timeFrom+'&limitEnd='+params.limit+'&t=31&prj='+__projectID+'&tags='+params.dlgid+'|'+params.tags+'&json={"filters":[]}&seq=1';
    __getRequest(false,dataout,function (err,data){
            callback(err);
    });
    }
    catch (e)
    {
        callback(true,"Generic error: "+e.message);
    }
}
exports.writeTags=__writeTags;


function __getRequest(isHisto, params, callback)
{
    var callbackCalled=false;
    var where="/l.fcgi";
    if (isHisto) where="/r.fcgi";
    
    var options = {
    host: '127.0.0.1',
    path: where,
    method: 'POST',
    port: __mySCADAConfig.http_port
    };
    
    var req = __http.request(options, 
    function(response) {
     var str = ''
     response.on('data', function (chunk) {
       str += chunk;
     });

     response.on('end', function () {
      // console.log(str);
      if (!callbackCalled)
      {
          callbackCalled=true;
          callback(false,str);
      }
       
     });

   }
   );

   req.on('error', function (e) {
       if (!callbackCalled)
      {
          callbackCalled=true;
            callback(true,e);
        }
   });

   req.on('timeout', function () {
     req.abort();
     if (!callbackCalled)
      {
          callbackCalled=true;
        callback(true,"Timeout");
      }
   });

   req.setTimeout(15000);
   req.write(params);
   req.end();
}

function __insertRowIntoDatalog(options,callback) {
   
       try
       {
     var dlgis=undefined;
     
     for (var key in __datalogs) {
        if (__datalogs.hasOwnProperty(key)) {
          
          if (__datalogs[key].id==options.dlgID)
            {
            dlgis=__datalogs[key];
            break;
            }
        }
    }

     
    
    if (dlgis==undefined)
    {
    callback(true,"Datalog not found! Check datalog id eg parameter dlgID") 
    return;
    }
    
    var data=options.data;
    
    if (dlgis.tags.length!=data.length)
    {
     callback(true,"Wrong number of items in data parameter.") 
    return;   
    }
    
    var dataout=[];
    
    for (var i=0;i<data.length;i++)
    {
       if ( typeof data[i] === 'string')
       {
             if (dlgis.tags[i].type!=1)
             {
                 callback(true,"data["+i+"] parameter should NOT be of type String!");
                return;
             }
             
           data[i]=getJSONValidString(data[i]);
           if (typeof data[i] === 'string')
           {
               try
               {
                  if (!data[i].startsWith("\""))
                {
                    data[i]="\""+data[i]+"\"";
                } 
               }catch (e)
               {
                   data[i]="\""+data[i]+"\"";
               }  
            }
            else
            {
                data[i]="\""+data[i]+"\"";
            }
               
       }
       else
       {
           if (isNaN(data[i]))
           {
               callback(true,"data["+i+"] parameter in NOT a Number!");
                return;
           }
           
           if (dlgis.tags[i].type==1)
             {
                 if (data[i]===null || data[i]===undefined)
                 {
                     data[i]="";
                     data[i]="\""+data[i]+"\"";
                 }
                 else
                 {
                     if (isNaN(data[i]))
                     {
                        callback(true,"data["+i+"] parameter should  be of type String!");
                       return;
                    }
                    else
                    {
                        data[i]=data[i].toString();
                        data[i]="\""+data[i]+"\"";
                    }
                }
             }
       }
       
       if (data[i]===null)
       {
       // dataout.push("null");   
        dataout.push(0);   
       }
       else
       {
       dataout.push(data[i]);
       }
    }
var pole_str=dataout.toString().replace(/\,/g,'|');
var ms=parseInt(options.timems);
if (ms<=1000) {ms=ms*1000;}
if (ms>1000*1000) {ms=0;}
var d=parseInt(options.time)+"|"+ms+"|"+pole_str;
var conf = {
    data: {
      t: 21,
      prj: __projectID,
      dlgID: options.dlgID,
      d: d
    }
  }
  const querystring = require('querystring');
  var dataout=querystring.stringify(conf.data);
  //dataout=dataout+"&d="+d; //+"|\3";
    __getRequest(false,dataout,function (err,data){
            callback(err,data);
    });
//writestring="t=21&prj="+__projectID+"&dlgID="+dlgid+"&d="+_time+"|"+_timems+"|"+pole_str+"|\3";

       }
       catch (e){
           callback(true,"Unspecified error:"+e) 
            return;
       }
}
exports.insertRowIntoDatalog=__insertRowIntoDatalog;

//pomocna funkce
function __getFilesInDir(startPath,filter){
    var result=[];
    //console.log('Starting from dir '+startPath+'/');
    var path = require('path'), fs=require('fs');
    
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        //return;
    }
    else
    {
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
       // if (stat.isDirectory()){
       //     fromDir(filename,filter); //recurse
       // }
       // else
            if (files[i].indexOf(filter)>=0) {
            //console.log('-- found: ',filename);
            result.push(filename); //startPath+"/"+
        };
    };
    }
    return result;
};

//ukladani reportu

function __generateReport(options,callback)
{
var filename = getFilenameUserFiles(options.report);
var saveFileAs=getFilename(options.saveAs);
//register fonts
//var font = getFilenameUserFiles('Roboto-Black.ttf');


//var font = getFilenameUserFiles('Ubuntu-R.ttf');

//load stimulsoft report engine
var Stimulsoft = require('stimulsoft-reports-js');
Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHlhKB4OYxsxXcAAYbkyKCdaCU5gVcvx7qmXYoe3nlqUg2CyW/" + 
"2kl4hiKA4CshVQGvqLB/TvA0nZdvHf7GBGAoY7sKOTSFWKcIvaD6OQI5L3ynokbHEpDSNr9ZJRA3FxIjJ0zQob7DiO" + 
"OH4/LzFfdDa2XZ55G0Sx5eagFBLWKwwCQeabcqDFoTgiuA60nAsABZfLyyNoTpL0Oj35lC+HHMwhZG4ask1+2eQK3m" + 
"eLhBiyWYJTIXwZ3rkyF3OooH/rCr3NGHZhy9s7RFeaPn59RYrFd1GAiCHlAvN5w6Yw0yMD+6XS/Hi87zh9X3TLwzDR" + 
"zr2Z3Nhz4gEK5x6Vir80lU/xA42rFaP8GcbvTcpuyh3TWtFqQ21z0psvduOganNqqRqi91j7aBRbzQmy18EX7IR3sG" + 
"B06U8AAjwPLtO4tdiNFF/LZXC+vjcqQv6Cb9VD/kwIYKFzB1dO0bUcwaWkbG1cMYSPjI9owKSxbNIfW2Cdv9QV2Pl4" + 
"bzBMnwNEscJVc0yItPBeTCBHNxbkOFNa8cY6";

//projdeme vsechny fonty a pridame
var dirFont=getFilenameUserFilesDir();
var fonts=__getFilesInDir(dirFont,".ttf");

for (var i=0;i<fonts.length;i++) {
        var font=fonts[i];
        try{
      Stimulsoft.Base.StiFontCollection.addOpentypeFontFile(font);
            }
            catch (e){}
}

var report = new Stimulsoft.Report.StiReport();
//load report file
report.loadFile(filename);
//get datalog names
var dlgs = report.reportAlias.split(',');
for (var i = dlgs.length; i--;) {
    if (dlgs[i] === 'root') {
        dlgs.splice(i, 1);
    }
}


var data=new Object();
for (var i=0;i<dlgs.length;i++)
{
    data[dlgs[i]]=new Array();
}
//use async library
async = require("async");
//create async task
var asyncTasks = [];
//one for each datalog

for (var i=0;i<dlgs.length;i++)
{    
   if (dlgs[i]!="alarms" && dlgs[i]!="usra")
   {
    if (__datalogs[dlgs[i]]!=undefined)
    asyncTasks.push(
    function(callback){
    var dlgname=dlgs[this.i];
    var o=new Object;
    //read datalog definition
    var dlgdef=__datalogs[dlgname];
    o.dlgid=dlgdef.id;
    o.tags=new Array();
    for (var ii=0;ii<dlgdef.tags.length;ii++)
    {
        o.tags.push(dlgdef.tags[ii].id);
    }
    if (options.timeFrom!=undefined) {o.timeFrom=options.timeFrom;}
    if (options.timeTo!=undefined) {o.timeTo=options.timeTo;}
    if (options.limitEnd)
    {
    o.limitEnd=1000;
    if (options.limits[o.dlgid]!=undefined) {o.limitEnd=options.limits[o.dlgid];}
    }
    else
    {
     o.limit=1000;   
     if (options.limits[o.dlgid]!=undefined) {o.limit=options.limits[o.dlgid];}
    }
    if (options.filters!=undefined)
    {
        var index=0;
        for (var tt=0;tt<options.filters.length;tt++)
        {
            var filter=options.filters[tt];
            for (var ii=0;ii<dlgdef.tags.length;ii++)
            {
                if (dlgdef.tags[ii].key && dlgdef.tags[ii].name==filter.key)
                {
                   if (index==0)
                   {o.filters=[];}
                    o.filters[index]=new Object();
                    o.filters[index].dlgid=o.dlgid;
                    o.filters[index].id=dlgdef.tags[ii].id;
                    o.filters[index].type=filter.type;
                    o.filters[index].val=filter.val;
                   index++;
                }
            }
        }
    }
    
    __readDatalogData(o, function(err,result){
        if (err) return callback();
        var dlgdef=undefined;
        var dlgname=undefined;
        for (var key in __datalogs) {
            if (__datalogs[key].id==o.dlgid)
            {
                dlgdef=__datalogs[key];
                dlgname=key;
                break;
            }
        }

        var offset=new Date().getTimezoneOffset();
        offset=offset*60*1000;
      for (i=0;i<result.length;i++)
      {
        var obj=new Object;
        obj.datetime=new Date(result[i].tm[0]*1000+Math.floor(result[i].tm[1]/1000)-offset).toJSON();
        for (var ii=0;ii<dlgdef.tags.length;ii++)
        {
           obj[dlgdef.tags[ii].name]=result[i][ii+1];
        }
        data[dlgname].push(obj);
      }
      callback();

    }.bind({ o : o }))
    }.bind({ i : i }));
 }
 else if (dlgs[i]=="alarms")
 {
     asyncTasks.push(
    function(callback){
     //read historical alarm data 
    var o=new Object;
    if (options.timeFrom!=undefined) {o.timeFrom=options.timeFrom;}
    if (options.timeTo!=undefined) {o.timeTo=options.timeTo;}
    if (options.limitEnd)
    {
    o.limitEnd=1000;
    if (options.limitsAlarms!=undefined) {o.limitEnd=options.limitsAlarms;}
    }
    else
    {
     o.limit=1000;   
     if (options.limitsAlarms!=undefined) {o.limit=options.limitsAlarms;}
    }
    
    if (options.language!=undefined)
    {
        o.language=options.language;
    }
    
    __readAlarmsHistory(o, function(err,result)
    {
        var offset=new Date().getTimezoneOffset();
        offset=offset*60*1000;
      //process each row of returned data
      for (i=0;i<result.length;i++)
      {
        var obj=new Object;
        obj.message=result[i].cell.msg; //Message
        obj.device=result[i].cell.dev; //Device field
        obj.area=result[i].cell.area; //Area field
        
        var id=result[i].id;
        if (o.language!=undefined)
        {
            
            if (__alarmMessages[id]!=undefined && __alarmMessages[id][o.language]!=undefined)
            {
               obj.message=__alarmMessages[id][o.language];
            }
            if (__alarmArea[id]!=undefined && __alarmArea[id][o.language]!=undefined)
            {
               obj.area=__alarmArea[id][o.language];
            }
            if (__alarmDevice[id]!=undefined && __alarmDevice[id][o.language]!=undefined)
            {
               obj.device=__alarmDevice[id][o.language];
            }
        }
        
        obj.status=result[i].cell.stat; //Alarms status
        
        obj.severity=__alarmSeverity[id];
        
        obj.activation_time=new Date(result[i].cell.atm[0]*1000+Math.floor(result[i].cell.atm[1]/1000)-offset).toJSON(); //Activation time
        obj.deactivation_time=new Date(result[i].cell.dtm[0]*1000+Math.floor(result[i].cell.dtm[1]/1000)-offset).toJSON(); //Deactivation time
        obj.acknowledge_time=new Date(result[i].cell.acktm[0]*1000+Math.floor(result[i].cell.acktm[1]/1000)-offset).toJSON(); //Acknowledge time
        obj.acktxt=result[i].cell.ak; //Acknowledge Value
        obj.acknowledge_value=result[i].cell.ackv; //Acknowledge Value
        obj.activation_value=result[i].cell.av; //Activation value
        obj.deactivation_value=result[i].cell.dv; //Deactivation value
        obj.value=result[i].cell.v; //Deactivation value
        obj.user=result[i].cell.user; //Link json for opening command for given alarm   
        data["alarms"].push(obj);
        }
      callback();
    }.bind({ o : o }));
    });
 }
 else  if (dlgs[i]=="usra")
 {
     asyncTasks.push(
    function(callback){
     //read historical alarm data 
    var o=new Object;
    if (options.timeFrom!=undefined) {o.timeFrom=options.timeFrom;}
    if (options.timeTo!=undefined) {o.timeTo=options.timeTo;}
    if (options.limitEnd)
    {
    o.limitEnd=1000;
    if (options.limitsAlarms!=undefined) {o.limitEnd=options.limitsAlarms;}
    }
    else
    {
     o.limit=1000;   
     if (options.limitsAlarms!=undefined) {o.limit=options.limitsAlarms;}
    }
    __readUserActions(o, function(err,result)
    {
        var offset=new Date().getTimezoneOffset();
        offset=offset*60*1000;
      //process each row of returned data
      for (i=0;i<result.length;i++)
      {
        var obj=new Object;
        obj.time=new Date(result[i].tm[0]*1000+Math.floor(result[i].tm[1]/1000)).toJSON();
        obj.text=result[i].text;
        obj.user=result[i].user;
        obj.severity=result[i].sv;
        obj.id=result[i].id;
        data["usra"].push(obj);
        }
      callback();
    }.bind({ o : o }));
    });
 }
}

async.parallel(asyncTasks, function(){
    
    report.dictionary.dataSources.clear();
    report.dictionary.databases.clear();				
    //var dataSet = new Stimulsoft.System.Data.DataSet("mySCADA"); 
    //dataSet.read(data);
    report.regData("mySCADA", "mySCADA", this.data);
    
    //zaregistrujeme objekt ze server side scriptu
    if (options.data!=undefined)
    {
        report.regData("Server Side Script Variables", "Server Side Script Variables", options.data);
    }
    
    if (options.dataSources!=undefined)
    {
        for (var i=0;i<options.dataSources.length;i++)
        {
            var name=options.dataSources[i].name;
            var datas=options.dataSources[i].data;
            if (name!==undefined && datas!==undefined)
            {
            report.regData(name, name, datas);
            }
        }
    }
    
    report.dictionary.synchronize();
    
    report.render();
    
    if (options.exportAs=='pdf')
    {
    var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
    var service = new Stimulsoft.Report.Export.StiPdfExportService();
    var stream = new Stimulsoft.System.IO.MemoryStream();
    service.exportTo(report, stream, settings);
    var data = stream.toArray();
    var buffer = new Buffer(data, "utf-8");
    var fs = require('fs');
    fs.writeFileSync(saveFileAs, buffer);
    callback(false);
    }
    else if (options.exportAs=='html')
    {
    var settings = new Stimulsoft.Report.Export.StiHtmlExportSettings();
    var service = new Stimulsoft.Report.Export.StiHtmlExportService();
    var textWriter = new Stimulsoft.System.IO.TextWriter();
    var htmlTextWriter = new Stimulsoft.Report.Export.StiHtmlTextWriter(textWriter);
    service.exportTo(report, htmlTextWriter, settings);
    var resultHtml = textWriter.getStringBuilder().toString();
    var fs = require('fs');
    fs.writeFileSync(saveFileAs, resultHtml);
    callback(false);
    }
    else
    {
        callback(false,report);
    }

}.bind({ data : data }));


}
exports.generateReport=__generateReport;
//pomocne
/* GENERAL FUNCTIONS */
function getDateAsString(tm,format)
{
    var moment = require('moment');
    var casissec=tm[0];
    var casisusec=tm[1];
    var cast=casissec*1000+casisusec/1000;
    var casint=Math.floor(cast);
    var casje=moment(casint);
    return casje.format(format);
}

function stripUnprintableChars(input)
{
    return getJSONValidString(input.replace(/[^\x20-\x7E]+/g, ''));
}

function getJSONValidString(s)
{
    	// preserve newlines, etc - use valid JSON
s = s.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
s = s.replace(/[\u0000-\u0019]+/g,"");
return s;
}

function __now(s)
{
return new Date()/1000;
}
exports.now=__now;


//Statistika
//Tady vypocitavame agregovana data

function __newLog(log)
{
    logFile(log);
}

/*
options={};
//umoznujeme vycitat z vice data-logu, tedy bude mozne je pro statistiky spojovat
options['sources']=[];
var src1={};
src1['dlgid']=2;
src1['tags']=[];
//pro dany konkretni tag umoznime pocitat vice statistik najednou
src1['tags'].push({id: 1, fcn: 'sum'});
src1['tags'].push({id: 1, fcn: 'avg'});
src1['tags'].push({id: 1, fcn: 'min'});
src1['tags'].push({id: 1, fcn: 'max'});
src1['tags'].push({id: 1, fcn: 'cnt'});
src1['tags'].push({id: 5, fcn: 'avg'});
options['sources'].push(src1);
//data budeme zapisovat do noveho datalogu
options['output']={};
options['output']['dlgid']=3;
//pokud nastavime aggregate budeme data agregovat dle teto podminky
options['aggregate']='P0Y0M0DT0H1M';

//triggery nam umozni agregovat data pri zmene hodnoty
options['triggers']=[];
var t={};
t['dlgid']=2;
t['items']=[];
t['items'].push({id:5, type: 'onchange'});
options['triggers'].push(t);
//alarmem muzeme definovat intervaly 
//aktivace alarmu znamena zacatek intervalu, deaktivace alarmu znamena konec
options['alarmTriggerID']=1;
options['nolog']=false; //if to log results into the data-log
*/
function __aggregateData(name,cbk)
{
var options=__aggregatedDlgs.data[name];
var async = require("async");
//nejdrive nacteme posledni zaznam v output datalogu abychom vedeli 
//od jakeho casu zacit hledat
o={};
o['dlgid']=options['output']['dlgid'];
o['tags']=[1];
o['limitEnd']=1;
__readDatalogData(o, function(err,result){
  var timeStart=new Date(0);
  
  if (!err && result.length>0)
  {
   //timeStart=result[0].datetime;
   var res=result[0][1];
   var d=new Date(res*1000);
   timeStart=d;
  }
  
  var asyncTasks0 = [];
  if (result.length===0)
  {
      if (options && options.logProcess) {__newLog("No record in aggregated datalog yet. Will find first row in all datalogs, this will be our start.");}
      //nenasli jsme zadny zaznam co ted?
      //nacteme prvni zaznam ze vsech datalogu ktere mame vycist a to  bude nas pocatek
              var sources=options['sources'];
              for (var i=0;i<sources.length;i++)
              {
                  var sss=sources[i];
                  if (sss.dlgid>=0)
                  {
                  asyncTasks0.push(
                    function(callback0){
                        o={};
                        o['dlgid']=this.source['dlgid'];
                        //doplnime tagy
                        var tags=[];
                        for (var j=0;j<this.source['tags'].length;j++)
                        {
                            var id=this.source['tags'][j].id;
                            var index=tags.indexOf(id);
                            if (index == -1) {
                            tags.push(id);
                            }
                        }
                        o['tags']=tags;
                        o['timeFrom']=0;
                        o['timeTo']=Math.round(new Date().getTime()/1000);
                        o['limit']=1;
                        __readDatalogData(o, function(err,result){
                        //process each row of returned data
                            if (!err && result.length>0)
                            {
                                var date=result[0].datetime;
                                //nalezneme ten nejmladsi datum
                                if (timeStart.getTime()===0 || timeStart>date) {
                                    timeStart=date;
                                    if (options && options.logProcess) {__newLog("Setting time start to:"+date.toString()+" Based on datalog id:"+sss.dlgid)}
                                }
                            }
                            
                            callback0();
                        });
                    }.bind({source: sss}));    
                }
            }  
  }
  else
  {
      if (options && options.logProcess) {__newLog("Time start set by reading last value in aggr. datalog to:"+timeStart.toString())}
  }
  
  //ted uz mame vycteny zacatek
  async.parallel(asyncTasks0, function(){
  //ted zjistime zda mame nejake triggery, pokud ano vycteme a ulozime data zmen
  var triggers=options['triggers'];
  var triggerDates=[];
  
    //create async task
    var asyncTasks = [];

if (triggers!== undefined)
{
    if (options && options.logProcess) {__newLog("Now reading triggers data.")};

  for (var i=0;i<triggers.length;i++)
  {
      var t=triggers[i];
      asyncTasks.push(
    function(callback){
      var tags=[];
      
      for (var j=0;j<t.items.length;j++)
      {
          tags.push(t.items[j].id);
      }
      
       if (options && options.logProcess) {__newLog("Processing datalog id:"+t.dlgid)};
       if (options && options.logProcess) {__newLog("First we read one row before interval to have init values.")};
      //nejdrive nacteme jeden zaznam pred intervalem, 
        //abychom meli init hodnoty
        o4={};
        o4['dlgid']=t.dlgid;
        o4['tags']=tags;
        o4['timeTo']=Math.round(timeStart/1000);
        o4['limitEnd']=1;
        __readDatalogData(o4, function(err,result){
            var initedValues=[];
            for (var k=0;k<this.trigger.items.length;k++)
                {
                initedValues[k]=undefined;
                }
            
            
            if (!err)
            {
                if (result.length>0)
                {
                    for (var k=0;k<this.trigger.items.length;k++)
                            {
                                var index=this.trigger.items[k].id;
                                var value=result[0][index]; //b ()
                                initedValues[k]=value; //byla zmena hodnoty
                            }
                }
            }
            
            o44={};
            o44['dlgid']=this.trigger.dlgid;
            o44['tags']=tags;
            o44['timeFrom']=Math.round(timeStart/1000);
            o44['limit']=10000;
            if (options!==undefined && options['limit']!==undefined)
                 {
                    o44['limit']=options['limit'];
                 }
            __readDatalogData(o44, function(err,result){
                if (!err)
                {
//                    var initedValues=[];
//                    for (var k=0;k<this.trigger.items.length;k++)
//                    {
//                        initedValues[k]=undefined;
//                    }
                    if (options && options.logProcess) {__newLog("Data for trigger readed OK. Rows:"+result.length)};
                   for (i=0;i<result.length;i++)
                        {
                          var date=result[i].datetime;
                          
                          for (var k=0;k<this.trigger.items.length;k++)
                            {
                                var index=this.trigger.items[k].id;
                                var value=result[i][index]; //b ()
                              
                                if (initedValues[k]!==value) //byla zmena hodnoty
                                {
                                    console.log(date+" "+value+" "+initedValues[k]);
                                    if (triggerDates.length>0)
                                    {
                                        if (triggerDates[triggerDates.length-1]!==date)
                                        {
                                            triggerDates.push(date);
                                        }
                                    }
                                    else
                                    {
                                    triggerDates.push(date);
                                    }

                                    initedValues[k]=value;
                                   // break;
                                }
                            }

                        }
                   
                }  
                else
            {
                 if (options && options.logProcess) {__newLog("Data for trigger readed Error:"+result)};
            }
                callback();
            }.bind({trigger: t}));
            
        }.bind({trigger: t}));
    });
  }
  
  }
  

  
  var alarmIntervals=[];
  
  if (options['alarmTriggerID'] !== undefined)
  {
        asyncTasks.push(
        function(callback){

        //read historical alarm data 
        if (options && options.logProcess) {__newLog("Processing alarm trigger IDs...")};
            
            var optionsA={};
            optionsA['timeFrom']=Math.round(timeStart/1000);
            //optionsA['timeTo']=new Date()/1000;
            optionsA['limit']=10000;
            if (options!==undefined && options['limit']!==undefined)
                {
                optionsA['limit']=options['limit'];
                }
            //hledame dle konkretniho id alarmu
            var almIDs=options['alarmTriggerID'];
            var sql="("+almIDs[0];
            for (var k=1;k<almIDs;k++)
            {
                sql=sql+","+almIDs[k];
            }
            sql=sql+") "
            optionsA['SQLWHERE']="alarmID in "+sql;
            __readAlarmsHistory(optionsA, function(err,result)
            {
                if (!err)
                {
                    
                    if (options && options.logProcess) {__newLog("Alarm triggers processed OK. Rows:"+result.length)};
                    //process each row of returned data
                    
                    for (i=0;i<result.length;i++)
                    {
                      var acttime=result[i].cell.acttime; //Activation time
                      var deacttime=result[i].cell.deacttime; //Deactivation time
                      var status=result[i].cell.stat; //Alarms status
                      
                      if (status===0) //sbirame jen deaktivace abychom meli uzavrene intervaly
                      {
                      alarmIntervals.push({a:acttime,d:deacttime,s:status});
                      }
                      
                    }
                }
                else
                    {
                        if (options && options.logProcess) {__newLog("Alarm triggers read error:"+result)};
                    }
              callback();
            }
                    
                    
                        );

        });
        
        if (options && options.logProcess) {__newLog("Alarm triggers read one item before start for init value:")};
        //ted vyctu predchozi hodnotu alarmu pred pozadovanym casem abych vedel init hodnotu
                asyncTasks.push(
        function(callback){
            var optionsA={};
            optionsA['timeTo']=Math.round(timeStart/1000);
            //optionsA['timeTo']=new Date()/1000;
            optionsA['limitEnd']=1;
            //hledame dle konkretniho id alarmu
            var almIDs=options['alarmTriggerID'];
            var sql="("+almIDs[0];
            for (var k=1;k<almIDs;k++)
            {
                sql=sql+","+almIDs[k];
            }
            sql=sql+") "
            optionsA['SQLWHERE']="alarmID in "+sql;
            __readAlarmsHistory(optionsA, function(err,result)
            {
                if (!err && result.length>0)
                {
                    
                      if (options && options.logProcess) {__newLog("Alarm triggers init readed.")};
                      var acttime=result[0].cell.acttime; //Activation time
                      var deacttime=result[0].cell.deacttime; //Deactivation time
                      var status=result[0].cell.stat; //Alarms status
                      alarmIntervals.push({a:acttime,d:deacttime,s:status});
                }
                else
                {
                     if (options && options.logProcess) {__newLog("Alarm triggers init NOT readed. Result:"+result)};
                    alarmIntervals.push({a:timeStart,d:new Date(0),s:1});
                }
              callback();
            });
        });
  }
  
  //zde uz mame nactene data triggery
  async.parallel(asyncTasks, function(){
    
      //ted jiz mame nactene pole triggeru, kdy musime prelozit data
      var td=triggerDates;
      //ziskame periodicke itervaly
      
      var timePom=new Date(timeStart.getTime());
      var defInt=[];
      
      if(options['aggregate'] !== undefined)
      {
          
      defInt=__getIso8601Intervals(timePom,options['aggregate'],options['timeOffset']);
      }
     
     
     //najdeme body aktivace a deaktivace alarmu
     //a pridame je do pole
        var alarmDates=[];
        for (var i=0; i<alarmIntervals.length; i++) {
            if (alarmIntervals[i].a>=timeStart) 
                    {      
                    alarmDates.push(alarmIntervals[i].a);
                    }
            if (alarmIntervals[i].d>=timeStart && alarmIntervals[i].d!==alarmIntervals[i].a) 
                {      
                alarmDates.push(alarmIntervals[i].d);
                }
                else
                {
                var k=3;
                }
        }
      //spojime pole
      var intervals2 = defInt.concat(td);
      intervals2 = intervals2.concat(alarmDates);
      //a setridime
      intervals2.sort(function(a,b){
        return a - b;
      });
      
      //odstranime duplikaty
      var intervals = [intervals2[0]];
        for (var i=1; i<intervals2.length; i++) {
           if (intervals2[i]!=intervals2[i-1]) intervals.push(intervals2[i]);
        }

        //a ted alarmy
        //projdeme vsechny intervaly a priradime jim zda se maji ulozit nebo ne
        var ai=alarmIntervals;
        var intervalsKeyed=[];
        if (ai.length>0)
            {
                var index=0;
                var enabled=true;
                for (var k=0;k<intervals.length;k++)
                {
                    var interval=intervals[k];
                    //nalezneme alarm k intervalu
                    while(interval.getTime()>ai[index].a.getTime() && index<(ai.length-1))
                    {
                        index++;
                    }
                   //enabled by melo byt obracene ale nevim proc je to blbe
                    if (interval.getTime()>=ai[index].a.getTime() && (interval.getTime()<=ai[index].d.getTime() || ai[index].d.getTime()===0))
                    {
                        enabled=false;
                    }
                    else
                    {
                        enabled=true;
                    }
                    
                    intervalsKeyed.push({d:intervals[k],b:enabled});
                }
            }
            else //pokud nemame intervaly definovane alarmem tak to jen updatneme
            {
                for (var k=0;k<intervals.length;k++)
                {
                    intervalsKeyed.push({d:intervals[k],b:true});
                }
            }
        
      //v interval mame nyni vsechny datumy podle kterych potrebujeme rozdelovat data
      //ted vycteme

      var data=[];
      var errCount=0;
      var lastDate=new Date();
      
      var sources=options['sources'];
              for (var i=0;i<sources.length;i++)
              {
                  var d={};
                  d['dlgid']=sources[i]['dlgid'];
                  d['values']={}; //pole vysledku, datum, hodnoty, ...
                  data.push(d);
              }
      //zase pouzijeme async a vycteme data paralelne
            //use async library
              //  async = require("async");
                //create async task
                var asyncTasks2 = [];
                var sources=options['sources'];
              for (var i=0;i<sources.length;i++)
              {
                  var s=sources[i];
                  var d=data[i]['values'];
                  var dlgid=data[i]['dlgid'];
                  if (dlgid===-1)
                  {
                      asyncTasks2.push(
                              function(callback2){
                                    if (options && options.logProcess) {__newLog("PROCESSING ALARMS")};
                                    //read historical alarm data 
                                    var ao={};
                                    ao['timeFrom']=Math.round(timeStart.getTime()/1000); 
                                    ao['timeTo']=Math.round(new Date().getTime()/1000);
                                    ao['limit']=20000;
                                    ao['aggregate']="occurenceTotal";
                                    //ao['severity']=100;
                                    ao['limitOccurence']=1000;
                                    ao['aggregateGroups']=intervalsKeyed;
                                    if (options!==undefined && options['limit']!==undefined)
                                    {
                                        ao['limit']=options['limit'];
                                    }
                                    
                                    if (options && options.logProcess) {__newLog("PROCESSING ALARMS")};
                                    
                                    __readAlarmsHistory(ao, function(err,result,itemsCount,datePom)
                                    {
                                        if (!err)
                                        {
                                            
                                            for (var property in result) {
                                                if (result.hasOwnProperty(property)) {
                                                    var arr=[];
                                                    for (var j=0;j<this.source['tags'].length;j++)
                                                    {
                                                        var fcn=this.source['tags'][j].fcn;
                                                        //TODO TODO TODO
                                                        var val=result[property];
                                                        if (fcn==='cnt')
                                                        {
                                                            arr.push(val.cnt);
                                                        }
                                                        else if (fcn==='val')
                                                        {
                                                            arr.push(val.val);
                                                        }
                                                        else if (fcn==='sec')
                                                        {
                                                            var tm=val.time.getTime()/1000;
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='msec')
                                                        {
                                                            var tm=val.time.getTime();
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='min')
                                                        {
                                                            var tm=val.time.getTime()/1000/60;
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='time')
                                                        {
                                                            arr.push(val.time);
                                                        }
                                                        //summary
                                                        else if (fcn==='secSum')
                                                        {
                                                            var tm=val.timeSum.getTime()/1000;
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='msecSum')
                                                        {
                                                            var tm=val.timeSum.getTime();
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='minSum')
                                                        {
                                                            var tm=val.timeSum.getTime()/1000/60;
                                                            arr.push(tm);
                                                        }
                                                        else if (fcn==='timeSum')
                                                        {
                                                            arr.push(val.timeSum);
                                                        }
                                                    }
                                                    this.dd[property]=arr;
                                                }
                                            }

                                            if (itemsCount===ao.limit)
                                            {
                                                if (datePom.getTime()<lastDate.getTime()) {
                                                    lastDate=datePom;
                                                    
                                                }
                                            }
                                        }
                                        else
                                        {
                                            errCount=errCount+1;
                                        }
                                      callback2();
                                    }.bind({source: this.source, dd: this.dd}));
                                    
                              }.bind({source: s, dd: d}));
                  }
                  else
                  {  
                            asyncTasks2.push(
                              function(callback2){
                                  var o={};
                                  o['dlgid']=this.source['dlgid'];
                                  
                                  //doplnime tagy
                                  var tags=[];
                                  for (var j=0;j<this.source['tags'].length;j++)
                                  {
                                      var id=this.source['tags'][j].id;
                                      var index=tags.indexOf(id);
                                      if (index == -1) {
                                      tags.push(id);
                                      }
                                  }
                                  o['tags']=tags;
                                  o['timeFrom']=Math.round(timeStart.getTime()/1000); 
                                  o['timeTo']=Math.round(new Date().getTime()/1000);
                                  o['limit']=10000;
                                  if (options!==undefined && options['limit']!==undefined)
                                  {
                                      o['limit']=options['limit'];
                                  }
                                  __readDatalogData(o, function(err,result){
                                  //process each row of returned data
                                  if (!err && result.length>0)
                                  {
                                      if (options && options.logProcess) {
                                      var end=result[result.length-1].datetime;
                                      var start=result[0].datetime;
                                              __newLog("PROCESSING DLG WITH ID:"+ o['dlgid']+" OK. Rows:"+result.length);
                                              __newLog("Start Time:"+start.toString());
                                              __newLog("End Time:"+end.toString());
                                      };
                                      
                                      //nastavime konec intervalu
                                      
                                      if (o.limit===result.length)
                                      {
                                      var endDate=result[result.length-1].datetime;
                                      if (endDate.getTime()<lastDate.getTime()) {
                                          lastDate=endDate;
                                         
                                                if (options && options.logProcess) {
                                                    __newLog("We have reached a limit for data, will set end time to last read data item.");
                                                }
                                         
                                            }
                                        }
                                      
                                      
                                      var aktDateIndex=0;
                                      //pripravime si pole s pomocnymi daty
                                      var pomArrays=[];
                                      for (var j=0;j<this.source['tags'].length;j++)
                                      {
                                          pomArrays[j]=[];
                                      }
                                      //prochazime vsechny vysledky
                                      for (i=0;i<result.length;i++)
                                      {
                                        var date=result[i].datetime;
                                        if (i===0)
                                        {
                                            for (var m=aktDateIndex;m<intervalsKeyed.length;m++)
                                            {
                                                if (intervalsKeyed[aktDateIndex].d>date) 
                                                {
                                                    aktDateIndex=m;
                                                      break;
                                                  }
                                             }
                                        }

                                        //kontrola zda nejsme za koncem pole pro jistotu
                                        if (intervalsKeyed[intervalsKeyed.length-1].d<date) 
                                        {
                                              break;
                                          }

                                          var newInterval=false;
                                          
                                          if (intervalsKeyed[aktDateIndex].d<=date)
                                          {
                                              newInterval=true;
                                          }
                                          
                                          //mame posledni zaznam tak uzavreme interval
                                          if (i===(result.length-1) && o.limit!==result.length)
                                          {
                                              newInterval=true;
                                          }
                                        //zkontrolujeme zda nepotrebujeme novy interval
                                        //zacatek intervalu je [ tedy vcetne pocatecni hodnoty
                                           //proto je zde <=
                                        if (newInterval)
                                        {
                                           // provedeme  agregaci a ulozime vysledky
                                           var row=[];

                                           var dateIs=intervalsKeyed[aktDateIndex].d;
                                           //konec intervalu je ) tedy bez koncove hodnoty
                                           //proto je zde <
                                            while(aktDateIndex<intervalsKeyed.length && intervalsKeyed[aktDateIndex].d<=date) 
                                           {
                                           aktDateIndex++; 
                                           }

                                           if (pomArrays[0].length>0)
                                           {
                                                  for (var j=0;j<this.source['tags'].length;j++)
                                                 {
                                                     if (this.source['tags'][j].fcn==='sum')
                                                     {
                                                         var total=0;
                                                         var arr=pomArrays[j];
                                                         for(var ik in arr) { total = total + arr[ik]; }
                                                         row.push(total);
                                                     }
                                                     else if (this.source['tags'][j].fcn==='avg')
                                                     {
                                                         var total=0;
                                                         var arr=pomArrays[j];
                                                         for(var ik in arr) { total = total + arr[ik]; }
                                                         row.push(total/arr.length);
                                                     }
                                                     else if (this.source['tags'][j].fcn==='min')
                                                     {
                                                         var arr=pomArrays[j];
                                                         var total=arr[0];
                                                         for(var ik in arr) { if (arr[ik]<total) total = arr[ik]; }
                                                         row.push(total);
                                                     }
                                                     else if (this.source['tags'][j].fcn==='max')
                                                     {
                                                         var arr=pomArrays[j];
                                                         var total=arr[0];
                                                         for(var ik in arr) { if (arr[ik]>total) total = arr[ik]; }
                                                         row.push(total);
                                                     }
                                                     else if (this.source['tags'][j].fcn==='cnt')
                                                     {
                                                         var arr=pomArrays[j];
                                                         row.push(arr.length);
                                                     }
                                                     else if (this.source['tags'][j].fcn==='val')
                                                     {
                                                         var arr=pomArrays[j];
                                                         if (arr.length>0)
                                                         {
                                                         row.push(arr[0]);
                                                         }
                                                         else
                                                         {
                                                             row.push(null);
                                                         }
                                                         
                                                     }
                                                     else
                                                     {
                                                        row.push(0); 
                                                     }
                                                     //vynulujeme pole pro mezivypocet
                                                     pomArrays[j]=[];
                                                 }
                                                 this.dd[dateIs]=row;
                                           }
                                        }

                                        //ukladame data jen kdyz mame priznak v intervalu nastaven na true;
                                        //pri pouziti triggeru Alarm, ukladame jen intervaly ve kterych je alarm aktivni
                                        if (intervalsKeyed[aktDateIndex] !==undefined && intervalsKeyed[aktDateIndex].b)
                                        {
                                              //pro kazdy tag ukladame hodnotu do pole
                                              for (var jk=0;jk<this.source['tags'].length;jk++)
                                              {
                                                  var id=this.source['tags'][jk].id;
                                                  var value=result[i][id]; 
                                                  pomArrays[jk].push(value);
                                              }
                                       }

                                      }
                                      
                                      
                                      
                                      
                                      
                                  }
                                  else if (err)
                                  {
                                  if (options && options.logProcess) {__newLog("PROCESSING DLG WITH ID:"+ o['dlgid']+" ERR:"+result)};
                                  errCount=errCount+1;    
                                  }
                                  
                                    callback2();
                                  }.bind({source: this.source, dd: this.dd}));
                              }.bind({source: s, dd: d}));
                          }
            }
            
              //zde uz mame nactene sumovane data
                async.parallel(asyncTasks2, function(){
                    
                    if (errCount==0)
                    {
                    if (options && options.logProcess) {__newLog("ALL DATA READED WITHOUT COMM ERROR.")};
                    var rowpush=[];
                    for (var j=0;j<intervalsKeyed.length;j++)
                    {
                        var contBool=true;
                        var date=intervalsKeyed[j].d;
                        if (j>0)
                        {
                        var previousDate=intervalsKeyed[j-1].d;
                            if (previousDate>=date)
                                {
                                   contBool=false;
                                }
                        }
                        else
                        {
                        var previousDate=timeStart;    
                        }
                    
                        if (date>timeStart && contBool)
                        {
                            var hasKey=false;
                            
                            for (var i in data) {
                                if (data.hasOwnProperty(i)) {
                                // for (var i=0;i<data.length;i++)
                                 //{
                                     if(data[i].values[date]!==undefined)
                                     {
                                         hasKey=true;
                                         break;
                                     }
                                 }
                            }
                            //pokud mame alespon jeden zaznam zpracujeme
                            if (hasKey)
                            {
                              
                                if (lastDate.getTime()>=date.getTime())
                                {
                                    var addit=true;
                                    var res=[];
                                    res.push(previousDate);
                                    res.push(date);
                                    for (var h in data) {
                                    if (data.hasOwnProperty(h)) 
                                        {
                                            var pole=data[h].values[date];
                                            var tags=options['sources'][h]['tags'];
                                            if (pole !== undefined)
                                            {
                                                for (var n=0;n<pole.length;n++)
                                                {
                                                    var indx=tags[n].index;
                                                    res[indx]=pole[n];
                                                }
                                            }
                                            else
                                            {
                                                //nemame zaznamy doplnime null
                                                for (var n=0;n<tags.length;n++)
                                                {
                                                    var indx=tags[n].index;
                                                    res[indx]=null;
                                                    //res.push(null);
                                                    if (options.skipEmptyRows)
                                                    {
                                                      addit=false;  
                                                    }
                                                    
                                                }
                                            }
                                        }
                                    }
                                    if (addit) {rowpush.push(res);}
                                    else
                                    {
                                        if (options && options.logProcess) {__newLog("ROW NOT ADDED DUE TO AN CHECK remove empty rows.")};
                                    }
                                }
                               
                            }
                            else if (!options.removeEmptyRows)
                            {
                                if (options && options.logProcess) {__newLog("No record found for given interval. Should I insert empty row? ...")};
//                                if (lastDate.getTime()>=date.getTime())
//                                {
//                                    var addit=true;
//                                    var res=[];
//                                    res.push(previousDate);
//                                    res.push(date);
//                                }
                            }
                        }
                    }
                    
                    if (options && options.logProcess) {__newLog("Data proccessed. Rows to add into db "+rowpush.length)};
                    
                    if (rowpush.length>0)
                    {
                        if (options['nolog']!==undefined && options['nolog'])
                        {
                        }
                        else
                        {
                            //vlozime radky do databaze
                            var processRow=function (index,rowpush)
                            {
                                    var date=rowpush[index][1];
                                    var previousDate=rowpush[index][0];

                                    var res=[];
                                    res.push(date.getTime()/1000);
                                    for (var k=2;k<rowpush[index].length;k++)
                                    {
                                        var itm=rowpush[index][k];
                                        if (itm===undefined) itm=null;
                                        res.push(itm);
                                    }
                                    
                                    var oo=new Object;
                                    oo['time']=Math.round(previousDate/1000);
                                    oo['timems']=previousDate.getMilliseconds();
                                    oo['dlgID']=options['output']['dlgid'];
                                    oo['data']=res;
                                    __insertRowIntoDatalog(oo, function (err,data){
                                        if (err)
                                        {
                                            if (options && options.logProcess) {__newLog("Error adding row into db. ERR:"+data)};
                                            console.log("ERR:"+data);
                                        }
                                        
                                         index++;
                                         if (index<rowpush.length)
                                         {
                                             setTimeout(function() { 
                                                processRow(index,rowpush);
                                                }, 100); 

                                         }
                                         
                                    });
                            }
                            processRow(0,rowpush);
                       }
                    }
                    if (cbk!==undefined)
                    {
                    cbk(false,rowpush);
                    }
                }
                else
                {
                    if (options && options.logProcess) {__newLog("ERR:Data from data log or alarm not readed! Try to decrease the limit for rows.")};
                  console.log("ERR:Data from data log or alarm not readed! Try to decrease the limit for rows.");  
                  if (cbk!==undefined){cbk(true,"ERR:Data from data log or alarm not readed! Try to decrease the limit for rows.");}
                }
                });
            
  });
  
  
  });
  
});


}
exports.aggregateData=__aggregateData;

function __getIso8601Intervals(dateFrom2,formatStr,timeOffset)
{
var moment = require('moment-timezone');
var offset=0;
if (timeOffset!=undefined && timeOffset.length!=undefined && timeOffset.length>0 && timeOffset!=='UTC')
        {
            if (moment.tz.zone(timeOffset)!==null)
            {
                var zone = moment.tz.zone(timeOffset);
                offset=zone.parse(dateFrom2); // 240  
            }
        }
        
var dateFrom=new Date(dateFrom2.getTime()-Math.abs(offset*60*1000));
var ret=[];
var dateFromOrig=new Date(dateFrom2.getTime());
dateFrom.setMilliseconds(0);
dateFrom.setSeconds(0);
dateFrom.setUTCHours(0);
dateFrom.setUTCMinutes(0);
dateFrom.setUTCDate(1);
//dateFrom.setUTCMonth(0);
var strDate=dateFrom.toISOString();

//var ISO8601 = require('./iso8601');
var isoDate = new ISO8601('R1/'+strDate+'/'+formatStr);
//zjistime si delku intervalu
var t1=isoDate.getDate();
var t2=isoDate.getNextDate();

//spocitame kolik potrebujeme intervalu
var seconds = (t2.getTime() - t1.getTime()) / 1000;
var t3pom=new Date()
var t3=new Date(t3pom.getTime()+Math.abs(offset*60*1000));

var secondsTotal=(t3.getTime() - t1.getTime()) / 1000;
//tolik potrebujeme intervalu
var interval=Math.round(secondsTotal/seconds)+1;
if (interval>100000) interval=100000;
var pomstr='R'+interval+'/'+strDate+'/'+formatStr;
var isoDate2 = new ISO8601(pomstr);

var intervals = isoDate2.getNextDate(interval);
intervals.forEach(function(d) {
    if (d.getTime()>dateFromOrig.getTime())
    {
        if (offset!==0)
        {
                var time=d.getTime()+offset*60*1000;
                var dd=new Date(time);  
                ret.push(dd);
        }
        else
        {
        ret.push(d);
        }
    }
    
});


return ret;
}

//pomocna knihovna ISO8061
/**
 * ISO8601.js
 *
 * Use javascript's native Date object to calculate the duration
 * or interval accompanying an ISO8601 formatted date string.
 *
 * @copyright   2013 John Rocela <me@iamjamoy.com>
 * @license     MIT License
 */
var moment = require('moment');

// Add a format function to the Date object
Date.prototype.format = function(format) {
    return moment(this).format(format);
}

// The ISO8601 object
var ISO8601 = function(string) {
    // Defaults
    this.repeat = null;
    this.duration = null;
    this.date = new Date().toISOString();

    try {
        // Parse the Date String
        var date = this.parse(string);

        this.repeat = date.repeat;
        this.date = date.date;
        this.duration = date.duration;
    } catch (err) {
        throw Error(err);
    }

}

// Parse Date String
ISO8601.prototype.parse = function(DateString) {
    var matches = DateString.split('/'),
        result = {};

    switch (matches.length) {
        case 2:
            
        break;
        default:
            //result.repeat = matches[0].match(/R(\d)/);
            //result.repeat = result.repeat[1] || null;
            result.repeat=matches[0].substr(1);
            
            result.date = new Date(matches[1]);
            if (result.date == 'Invalid Date') {
                throw Error('Not valid ISO8601 Date format.');
            }

            result.duration = this.parseDuration(matches[2]);
            if (!result.duration) {
                throw Error('Not valid ISO8601 Duration format.');
            }
        break;
    }

    return result;
}

// Parse Duration String
ISO8601.prototype.parseDuration = function(DurationString) {
    var matches = DurationString.match(/^P([0-9]+Y|)?([0-9]+M|)?([0-9]+D|)?T?([0-9]+H|)?([0-9]+M|)?([0-9]+S|)?$/),
        result = {};

    if (matches) {
        result.year = parseInt(matches[1]);
        result.month = parseInt(matches[2]);
        result.day = parseInt(matches[3]);
        result.hour = parseInt(matches[4]);
        result.minute = parseInt(matches[5]);
        result.second = parseInt(matches[6]);

        result.toString = function() {
            var string = '';

            if (this.year) string += this.year + ' Year' + (this.year == 1 ? '': 's') + ' ';
            if (this.month) string += this.month + ' Month' + (this.month == 1 ? '': 's') + ' ';
            if (this.day) string += this.day + ' Day' + (this.day == 1 ? '': 's') + ' ';
            if (this.hour) string += this.hour + ' Hour' + (this.hour == 1 ? '': 's') + ' ';
            if (this.minute) string += this.minute + ' Minute' + (this.minute == 1 ? '': 's') + ' ';
            if (this.second) string += this.second + ' Second' + (this.second == 1 ? '': 's') + ' ';

            return string;
        }

        return result;
    } else {
        return false;
    }
}

ISO8601.prototype.getRepeat = function() {
    return this.repeat;
}

ISO8601.prototype.getDate = function() {
    return new Date(this.date);
}

ISO8601.prototype.getDuration = function() {
    return this.duration;
    this.duration.prototype

    return this.duration;
}

ISO8601.prototype.getNextDate = function(n) {
    var date = this.getDate(),
        dates = [];

    n = n || 1;
    
    while (n--) {
        if (this.duration.year) {
            date.setFullYear(date.getFullYear() + parseInt(this.duration.year));
        }

        if (this.duration.month) {
            date.setMonth(date.getMonth() + parseInt(this.duration.month));
        }

        if (this.duration.day) {
            date.setDate(date.getDate() + parseInt(this.duration.day));
        }

        if (this.duration.hour) {
            date.setHours(date.getHours() + parseInt(this.duration.hour));
        }

        if (this.duration.minute) {
            date.setMinutes(date.getMinutes() + parseInt(this.duration.minute));
        }

        if (this.duration.second) {
            date.setSeconds(date.getSeconds() + parseInt(this.duration.second));
        }

        var copy = new Date(date);
        dates.push(copy);
    }

    return (dates.length == 1) ? dates[0]: dates;
}

// Expose the API
//module.exports = ISO8601;

//help data
function __getDataFromLocalhost(where, port, callback)
{
    var callbackCalled=false;
   
    
    var options = {
    host: '127.0.0.1',
    path: where,
//    method: 'POST',
    port: port
    };
    
    var req = __http.request(options, 
    function(response) {
     var str = ''
     response.on('data', function (chunk) {
       str += chunk;
     });

     response.on('end', function () {
      // console.log(str);
      if (!callbackCalled)
      {
          callbackCalled=true;
          callback(false,str);
      }
       
     });

   }
   );

   req.on('error', function (e) {
       if (!callbackCalled)
      {
          callbackCalled=true;
            callback(true,e);
        }
   });

   req.on('timeout', function () {
     req.abort();
     if (!callbackCalled)
      {
          callbackCalled=true;
        callback(true,"Timeout");
      }
   });

   req.setTimeout(15000);
   req.end();
}
exports.getDataFromLocalhost=__getDataFromLocalhost;

