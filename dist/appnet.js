/*
 * base.js
 *
 * Base app.net library file. Sets up the single global appnet object.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';
  var appnet = {
    userToken: null,
    appToken: null,
    endpoints: null,
    core: {}
  };

  appnet.authorize = function (user, app)
  {
    this.userToken = user;
    this.appToken = app;
  };
  
  appnet.deauthorize = function ()
  {
    this.userToken = null;
    this.appToken = null;
  };

  appnet.isLogged = function ()
  {
    return (this.isApp() || this.isUser());
  };

  appnet.isApp = function ()
  {
    var result = false;
    if (this.appToken)
    {
      result = true;
    }
    return result;
  };

  appnet.isUser = function ()
  {
    var result = false;
    if (this.userToken)
    {
      result = true;
    }
    return result;
  };

  $.fn.appnet = function () {
    return appnet;
  };

}(jQuery));

/*global jQuery: true */
(function ($) {
'use strict';
$.appnet().endpoints = {'format_version':1,'data_version':3,'scopes':{'basic':'see basic information about this user','stream':'read this users stream','email':'access this users email address','write_post':'create a new post as this user','follow':'add or remove follows (or mutes) for this user','public_messages':'send and receive public messages as this user','messages':'send and receive public and private messages as this user','update_profile':'update a users name, images, and other profile information','files':'manage a users files. This is not needed for uploading files.','export':'bulk export all of this users App.net data. This is intended only for backup services, not day-to-day App.net client use. Users will be shown an extra warning when this scope is requested due to the sensitivity of this data.'},'stream_types':['user','post','channel','message','file','stream','filter','interaction','marker','text','token','place','explore'],'base':'https://alpha-api.app.net/stream/0/','endpoints':[{'adnapi':'100','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'users/','suffix':'','token':'None','scope':'basic'},{'adnapi':'101','group':'user','params':'0','usesdata':'1','arrayparam':'0','name':'update','type':'PUT','prefix':'users/me','suffix':'','token':'User','scope':'update_profile'},{'adnapi':'102','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getAvatar','type':'GET','prefix':'users/','suffix':'/avatar','token':'none','scope':'basic'},{'adnapi':'103','group':'user','params':'0','usesdata':'1','arrayparam':'0','name':'updateAvatar','type':'POST-RAW','prefix':'users/me/avatar','suffix':'','token':'User','scope':'update_profile'},{'adnapi':'104','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getCover','type':'GET','prefix':'users/','suffix':'/cover','token':'none','scope':'basic'},{'adnapi':'105','group':'user','params':'0','usesdata':'1','arrayparam':'0','name':'updateCover','type':'POST-RAW','prefix':'users/me/cover','suffix':'','token':'User','scope':'update_profile'},{'adnapi':'106','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'follow','type':'POST','prefix':'users/','suffix':'/follow','token':'User','scope':'follow'},{'adnapi':'107','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'unfollow','type':'DELETE','prefix':'users/','suffix':'/follow','token':'User','scope':'follow'},{'adnapi':'108','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'mute','type':'POST','prefix':'users/','suffix':'/mute','token':'User','scope':'follow'},{'adnapi':'109','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'unmute','type':'DELETE','prefix':'users/','suffix':'/mute','token':'User','scope':'follow'},{'adnapi':'110','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'block','type':'POST','prefix':'users/','suffix':'/block','token':'User','scope':'follow'},{'adnapi':'111','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'unblock','type':'DELETE','prefix':'users/','suffix':'/block','token':'User','scope':'follow'},{'adnapi':'112','group':'user','params':'0','usesdata':'0','arrayparam':'1','name':'getList','type':'GET','prefix':'users','suffix':'','token':'Any','scope':'basic'},{'adnapi':'113','group':'user','params':'0','usesdata':'0','arrayparam':'0','name':'search','type':'GET','prefix':'users/search','suffix':'','token':'Any','scope':'basic'},{'adnapi':'114','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getFollowing','type':'GET','prefix':'users/','suffix':'/following','token':'Any','scope':'basic'},{'adnapi':'115','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getFollowers','type':'GET','prefix':'users/','suffix':'/followers','token':'Any','scope':'basic'},{'adnapi':'116','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getFollowingIds','type':'GET','prefix':'users/','suffix':'/following/ids','token':'Any','scope':'basic'},{'adnapi':'117','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getFollowerIds','type':'GET','prefix':'users/','suffix':'/followers/ids','token':'Any','scope':'basic'},{'adnapi':'118','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getMuted','type':'GET','prefix':'users/','suffix':'/muted','token':'Any','scope':'basic'},{'adnapi':'119','group':'user','params':'0','usesdata':'0','arrayparam':'1','name':'getMutedList','type':'GET','prefix':'users/muted/ids','suffix':'','token':'App','scope':'basic'},{'adnapi':'120','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getBlocked','type':'GET','prefix':'users/','suffix':'/blocked','token':'Any','scope':'basic'},{'adnapi':'121','group':'user','params':'0','usesdata':'0','arrayparam':'1','name':'getBlockedList','type':'GET','prefix':'users/blocked/ids','suffix':'','token':'App','scope':'basic'},{'adnapi':'122','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getReposters','type':'GET','prefix':'posts/','suffix':'/reposters','token':'Any','scope':'basic'},{'adnapi':'123','group':'user','params':'1','usesdata':'0','arrayparam':'0','name':'getStars','type':'GET','prefix':'posts/','suffix':'/stars','token':'Any','scope':'basic'},{'adnapi':'200','group':'post','params':'0','usesdata':'1','arrayparam':'0','name':'create','type':'POST','prefix':'posts','suffix':'','token':'User','scope':'write_post'},{'adnapi':'201','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'posts/','suffix':'','token':'None','scope':'basic'},{'adnapi':'202','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'destroy','type':'DELETE','prefix':'posts/','suffix':'','token':'User','scope':'write_post'},{'adnapi':'203','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'repost','type':'POST','prefix':'posts/','suffix':'/repost','token':'User','scope':'write_post'},{'adnapi':'204','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'unrepost','type':'DELETE','prefix':'posts/','suffix':'/repost','token':'User','scope':'write_post'},{'adnapi':'205','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'star','type':'POST','prefix':'posts/','suffix':'/star','token':'User','scope':'write_post'},{'adnapi':'206','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'unstar','type':'DELETE','prefix':'posts/','suffix':'/star','token':'User','scope':'write_post'},{'adnapi':'207','group':'post','params':'0','usesdata':'0','arrayparam':'1','name':'getList','type':'GET','prefix':'posts','suffix':'','token':'Any','scope':'basic'},{'adnapi':'208','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'getUserPosts','type':'GET','prefix':'users/','suffix':'/posts','token':'None','scope':'basic'},{'adnapi':'209','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'getUserStarred','type':'GET','prefix':'users/','suffix':'/stars','token':'None','scope':'basic'},{'adnapi':'210','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'getUserMentions','type':'GET','prefix':'users/','suffix':'/mentions','token':'Any','scope':'basic'},{'adnapi':'211','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'getHashtag','type':'GET','prefix':'posts/tag/','suffix':'','token':'None','scope':'basic'},{'adnapi':'212','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'getThread','type':'GET','prefix':'posts/','suffix':'/replies','token':'Any','scope':'basic'},{'adnapi':'213','group':'post','params':'0','usesdata':'0','arrayparam':'0','name':'getUserStream','type':'GET','prefix':'posts/stream','suffix':'','token':'User','scope':'stream'},{'adnapi':'214','group':'stream','params':'0','usesdata':'0','arrayparam':'0','name':'getUnifiedStream','type':'GET','prefix':'posts/stream/unified','suffix':'','token':'User','scope':'stream'},{'adnapi':'215','group':'post','params':'0','usesdata':'0','arrayparam':'0','name':'getGlobal','type':'GET','prefix':'posts/stream/global','suffix':'','token':'User','scope':'basic'},{'adnapi':'216','group':'post','params':'1','usesdata':'0','arrayparam':'0','name':'report','type':'POST','prefix':'posts/','suffix':'/report','token':'User','scope':'basic'},{'adnapi':'300','group':'channel','params':'0','usesdata':'0','arrayparam':'0','name':'getUserSubscribed','type':'GET','prefix':'channels','suffix':'','token':'User','scope':'messages'},{'adnapi':'301','group':'channel','params':'0','usesdata':'1','arrayparam':'0','name':'create','type':'POST','prefix':'channels','suffix':'','token':'User','scope':'messages'},{'adnapi':'302','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'channels/','suffix':'','token':'Varies','scope':'messages'},{'adnapi':'303','group':'channel','params':'0','usesdata':'0','arrayparam':'1','name':'getList','type':'GET','prefix':'channels','suffix':'','token':'Varies','scope':'messages'},{'adnapi':'304','group':'channel','params':'0','usesdata':'0','arrayparam':'0','name':'getCreated','type':'GET','prefix':'users/me/channels','suffix':'','token':'User','scope':'messages'},{'adnapi':'305','group':'channel','params':'0','usesdata':'0','arrayparam':'0','name':'getUnreadCount','type':'GET','prefix':'users/me/channels/pm/num_unread','suffix':'','token':'User','scope':'messages'},{'adnapi':'306','group':'channel','params':'1','usesdata':'1','arrayparam':'0','name':'update','type':'PUT','prefix':'channels/','suffix':'','token':'User','scope':'messages'},{'adnapi':'307','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'subscribe','type':'POST','prefix':'channels/','suffix':'/subscribe','token':'User','scope':'messages'},{'adnapi':'308','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'unsubscribe','type':'DELETE','prefix':'channels/','suffix':'/subscribe','token':'User','scope':'messages'},{'adnapi':'309','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'getSubscribers','type':'GET','prefix':'channels/','suffix':'/subscribers','token':'None','scope':'messages'},{'adnapi':'310','group':'channel','params':'0','usesdata':'0','arrayparam':'1','name':'getSubscriberIds','type':'GET','prefix':'channels/','suffix':'/subscribers/ids','token':'None','scope':'messages'},{'adnapi':'311','group':'channel','params':'0','usesdata':'0','arrayparam':'1','name':'getSubscriberIdList','type':'GET','prefix':'channels/subscribers/ids','suffix':'','token':'Any','scope':'messages'},{'adnapi':'312','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'mute','type':'POST','prefix':'channels/','suffix':'/mute','token':'User','scope':'messages'},{'adnapi':'313','group':'channel','params':'1','usesdata':'0','arrayparam':'0','name':'unmute','type':'DELETE','prefix':'channels/','suffix':'/mute','token':'User','scope':'messages'},{'adnapi':'314','group':'channel','params':'0','usesdata':'0','arrayparam':'0','name':'getMuted','type':'GET','prefix':'users/me/channels/muted','suffix':'','token':'User','scope':'messages'},{'adnapi':'400','group':'message','params':'1','usesdata':'0','arrayparam':'0','name':'getChannelMessages','type':'GET','prefix':'channels/','suffix':'/messages','token':'None','scope':'messages'},{'adnapi':'401','group':'message','params':'1','usesdata':'1','arrayparam':'0','name':'create','type':'POST','prefix':'channels/','suffix':'/messages','token':'User','scope':'messages'},{'adnapi':'402','group':'message','params':'2','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'channels/','suffix':'/messages/','token':'None','scope':'messages'},{'adnapi':'403','group':'message','params':'0','usesdata':'0','arrayparam':'1','name':'getList','type':'GET','prefix':'channels/messages','suffix':'','token':'None','scope':'messages'},{'adnapi':'404','group':'message','params':'0','usesdata':'0','arrayparam':'0','name':'getUserMessages','type':'GET','prefix':'users/me/messages','suffix':'','token':'User','scope':'messages'},{'adnapi':'405','group':'message','params':'2','usesdata':'0','arrayparam':'0','name':'destroy','type':'DELETE','prefix':'channels/','suffix':'/messages/','token':'User','scope':'messages'},{'adnapi':'500','group':'file','params':'0','usesdata':'1','arrayparam':'0','name':'create','type':'POST-RAW','prefix':'files','suffix':'','token':'User','scope':'files'},{'adnapi':'501','group':'file','params':'0','usesdata':'0','arrayparam':'0','name':'createPlaceholder','type':'POST','prefix':'files','suffix':'','token':'User','scope':'files'},{'adnapi':'502','group':'file','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'files/','suffix':'','token':'User','scope':'basic'},{'adnapi':'503','group':'file','params':'0','usesdata':'0','arrayparam':'1','name':'getList','type':'GET','prefix':'files','suffix':'','token':'User','scope':'files'},{'adnapi':'504','group':'file','params':'1','usesdata':'0','arrayparam':'0','name':'destroy','type':'DELETE','prefix':'files/','suffix':'','token':'User','scope':'files'},{'adnapi':'505','group':'file','params':'0','usesdata':'0','arrayparam':'0','name':'getUserFiles','type':'GET','prefix':'users/me/files','suffix':'','token':'User','scope':'files'},{'adnapi':'506','group':'file','params':'1','usesdata':'1','arrayparam':'0','name':'update','type':'PUT','prefix':'files/','suffix':'','token':'User','scope':'files'},{'adnapi':'507','group':'file','params':'1','usesdata':'0','arrayparam':'0','name':'getContent','type':'GET','prefix':'files/','suffix':'/content','token':'User','scope':'files'},{'adnapi':'508','group':'file','params':'1','usesdata':'1','arrayparam':'0','name':'setContent','type':'PUT','prefix':'files/','suffix':'/content','token':'User','scope':'files'},{'adnapi':'600','group':'stream','params':'0','usesdata':'1','arrayparam':'0','name':'create','type':'POST','prefix':'streams','suffix':'','token':'App','scope':'basic'},{'adnapi':'601','group':'stream','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'streams/','suffix':'','token':'App','scope':'basic'},{'adnapi':'602','group':'stream','params':'1','usesdata':'1','arrayparam':'0','name':'update','type':'PUT','prefix':'streams/','suffix':'','token':'App','scope':'basic'},{'adnapi':'603','group':'stream','params':'1','usesdata':'0','arrayparam':'0','name':'destroy','type':'DELETE','prefix':'streams/','suffix':'','token':'App','scope':'basic'},{'adnapi':'604','group':'stream','params':'0','usesdata':'0','arrayparam':'0','name':'getAll','type':'GET','prefix':'streams','suffix':'','token':'App','scope':'basic'},{'adnapi':'605','group':'stream','params':'0','usesdata':'0','arrayparam':'0','name':'destroyAll','type':'DELETE','prefix':'streams','suffix':'','token':'App','scope':'basic'},{'adnapi':'700','group':'filter','params':'0','usesdata':'1','arrayparam':'0','name':'create','type':'POST','prefix':'filters','suffix':'','token':'User','scope':'basic'},{'adnapi':'701','group':'filter','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'filters/','suffix':'','token':'User','scope':'basic'},{'adnapi':'702','group':'filter','params':'1','usesdata':'1','arrayparam':'0','name':'update','type':'PUT','prefix':'filters/','suffix':'','token':'User','scope':'basic'},{'adnapi':'703','group':'filter','params':'1','usesdata':'0','arrayparam':'0','name':'destroy','type':'DELETE','prefix':'filters/','suffix':'','token':'User','scope':'basic'},{'adnapi':'704','group':'filter','params':'0','usesdata':'0','arrayparam':'0','name':'getUserFilters','type':'GET','prefix':'filters','suffix':'','token':'User','scope':'basic'},{'adnapi':'705','group':'filter','params':'0','usesdata':'0','arrayparam':'0','name':'destroyUserFilters','type':'DELETE','prefix':'filters','suffix':'','token':'User','scope':'basic'},{'adnapi':'800','group':'interaction','params':'0','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'users/me/interactions','suffix':'','token':'User','scope':'basic'},{'adnapi':'900','group':'marker','params':'0','usesdata':'1','arrayparam':'0','name':'update','type':'POST','prefix':'posts/marker','suffix':'','token':'User','scope':'basic'},{'adnapi':'1000','group':'text','params':'0','usesdata':'1','arrayparam':'0','name':'process','type':'POST','prefix':'text/process','suffix':'','token':'Any','scope':'basic'},{'adnapi':'1100','group':'token','params':'0','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'token','suffix':'','token':'Any','scope':'basic'},{'adnapi':'1101','group':'token','params':'0','usesdata':'0','arrayparam':'0','name':'getAuthorizedIds','type':'GET','prefix':'tokens/user_ids','suffix':'','token':'App','scope':'basic'},{'adnapi':'1102','group':'token','params':'0','usesdata':'0','arrayparam':'0','name':'getAuthorizedTokens','type':'GET','prefix':'apps/me/token','suffix':'','token':'App','scope':'basic'},{'adnapi':'1200','group':'place','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'places/','suffix':'','token':'Any','scope':'basic'},{'adnapi':'1201','group':'place','params':'0','usesdata':'0','arrayparam':'0','name':'search','type':'GET','prefix':'places/search','suffix':'','token':'User','scope':'basic'},{'adnapi':'1300','group':'explore','params':'0','usesdata':'0','arrayparam':'0','name':'show','type':'GET','prefix':'posts/stream/explore','suffix':'','token':'None','scope':'basic'},{'adnapi':'1301','group':'explore','params':'1','usesdata':'0','arrayparam':'0','name':'get','type':'GET','prefix':'stream/explore/','suffix':'','token':'None','scope':'basic'}]};
}(jQuery));

/*
 * core.js
 *
 * Core functions for calling the app.net API via ajax.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  var callSuccess = function (response)
  {
    if (response !== null &&
	response.meta !== undefined &&
	response.data !== undefined)
    {
      if (this.success)
      {
        this.success(response);
      }
    }
    else
    {
      if (this.failure)
      {
//        console.log('AppNet null response');
//        console.dir(response);
        this.failure(response.meta);
      }
    }
  };

  var callFailure = function (request, status, thrown)
  {
//    console.log('AppNet call failed: ' + status + ', thrown: ' + thrown);
//    console.dir(request.responseText);
    var meta = null;
    if (request.responseText) {
      var response = JSON.parse(request.responseText);
      if (response !== null) {
        meta = response.meta;
      }
    }
    if (this.failure) {
      this.failure(meta);
    }
  };

  function makeArgs(args)
  {
    var result = '';
    if (args)
    {
      result = $.param(args);
    }
    if (result !== '')
    {
      result = '?' + result;
    }
    return result;
  }

  function makeData(data)
  {
    var result = null;
    if (data)
    {
      result = JSON.stringify(data);
    }
    return result;
  }

  $.appnet().core.makeUrl = function (pieces)
  {
    var result = '';
    var i = 0;
    for (i = 0; i < pieces.length; i += 1)
    {
      if (pieces[i])
      {
        result += pieces[i];
      }
    }
    return result;
  };

  $.appnet().core.call = function (url, type, args, success, failure, data)
  {
    var complete = {
      success: success,
      failure: failure
    };
    var options = {
      contentType: 'application/json',
      dataType: 'json',
      type: type,
      url: url + makeArgs(args)
    };
    if (this.accessToken) {
      options.headers = { Authorization: 'Bearer ' + this.accessToken };
    }
    if (data) {
      options.data = makeData(data);
    }
    var header = $.ajax(options);
    header.done($.proxy(callSuccess, complete));
    header.fail($.proxy(callFailure, complete));
  };

}(jQuery));

/*
 * add.js
 *
 * Evaluate the endpoints json and add all the appropriate endpoint methods.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  function run(endpoints)
  {
    addTypes(endpoints.stream_types);
    addEndpoints(endpoints.base, endpoints.endpoints);
  }

  function addTypes(types)
  {
    var i = 0;
    for (i = 0; i < types.length; i += 1)
    {
      $.appnet()[types[i]] = {};
    }
  }

  function addEndpoints(base, endpoints)
  {
    var i = 0;
    for (i = 0; i < endpoints.length; i += 1)
    {
      var group = $.appnet()[endpoints[i].group];
      if (! group)
      {
        console.log('Invalid group: ' + endpoints[i].group);
        console.dir(endpoints[i]);
      }
      else
      {
        addEndpoint(base, group, endpoints[i]);
      }
    }
  }

  function call(vars, argsIn, success, failure)
  {
    var url = $.appnet().core.makeUrl([vars.base, vars.end.prefix, vars.first,
                                       vars.end.suffix, vars.second]);
    var args = {};
    if (vars.list)
    {
      args.ids = vars.list.join(',');
    }
    $.extend(args, argsIn);
    $.appnet().core.call(url, vars.end.type, args, vars.success, vars.failure);
  }

  function addEndpoint(base, group, end)
  {
    if (end.params === '0')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix]));
    }
    else if (end.params === '1')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix, '1111', end.suffix]));
    }
    else if (end.params === '2')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix, '1111', end.suffix, '2222']));
    }
    if (end.params === '0' &&
        end.usesdata === '0' &&
        end.arrayparam === '0')
    {
      group[end.name] = function (args, success, failure) {
        call({ base: base, end: end },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '0' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, args, success, failure) {
        call({ base: base, end: end, first: first },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '0' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, second, args, success, failure) {
        call({ base: base, end: end, first: first, second: second },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (data, args, success, failure) {
        call({ base: base, end: end, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, data, args, success, failure) {
        call({ base: base, end: end, first: first, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, second, data, args, success, failure) {
        call({ base: base, end: end, first: first, second: second, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (list, args, success, failure) {
        call({ base: base, end: end, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, list, args, success, failure) {
        call({ base: base, end: end, first: first, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, second, list, args, success, failure) {
        call({ base: base, end: end, first: first, second: second, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (data, list, args, success, failure) {
        call({ base: base, end: end, data: data, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, data, list, args, success, failure) {
        call({ base: base, end: end, first: first, data: data, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, second, data, list, args, success, failure) {
        call({ base: base, end: end, first: first, second: second,
               data: data, list: list },
             args, success, failure);
      };
    }
  }

  run($.appnet().endpoints);

}(jQuery));
