define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/work/WorkTasksTemplate.html',
  'text!templates/work/WorkHistoryModalTemplate.html',
  'collections/work/WorkCollection',
  'collections/work/WorkHistoryModalCollection'
], 
function($, _, Backbone, bootstrap, WorkTasksTemplate, WorkHistoryModalTemplate, WorkCollection, WorkHistoryModalCollection){
  
  var work_col = new WorkCollection();  
  var WorkTasksView = Backbone.View.extend({ 

    el: $("#content"),

    render: function(){

      work_col.fetch({ url: 'app/mocks/work/worktasks.json', async: false, success:function(){
      }}); 

      var history_col = new WorkHistoryModalCollection();
      
      history_col.fetch({ url: 'app/mocks/work/historymodal.json', async: false, success:function(){
        }});

      var work = work_col.toJSON();
      var history = history_col.toJSON();

      var work = {
        worktasks: work_col.models,
        historymodal: history_col.models,
        _: _        
      }

      var workTamplate = _.template(WorkTasksTemplate, work);
      var historyTamplate = _.template(WorkHistoryModalTemplate, work);
     
      $("#content").html(workTamplate);
      $("#content").append(historyTamplate); 

    },

      events: {
        "click .history-modal"  : "showHistory",
        "click #create-btn"     : "addTask",
        "dblclick .taskname"    : "editTask"
      },

      showHistory: function(e){
        e.preventDefault();
        $('#myModal').show();
      },

      addTask: function(e) {
        e.preventDefault();
        var newWorkTaskModel = {
          "name": "Task Name", 
          "id": "1", 
          "percentage": "0" }
          work_col.unshift(newWorkTaskModel);
          console.log(work_col);
      },

      editTask: function(e) {
        e.preventDefault();
      },

  });

  return WorkTasksView;
});

// --- edit tasks
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6.1x.1y=7(q){2 r={T:"",w:"",G:"x",18:"",19:"25",1a:"10",1b:"#1z",H:"1A",1c:"1d...",B:"",I:"(1B 1C J 1D x)",1e:"1E 1f 9",1g:U,V:"V",W:"W",X:"X",1h:\'<Y K="Z" y="1i" 9="1F"/>\',1j:\'<Y K="Z" y="1k" 9="1G"/>\',11:u,1l:"C",12:U,L:U,M:7(a){13("1m J C 9: "+a.1H||\'1I 1n\')}};3(q){6.1J(r,q)}3(r.B!=""){2 s=1f 1K();s.1o=r.B}1p.1q.D=7(){E 4.z(/^\\s+/,\'\').z(/\\s+$/,\'\')};1p.1q.F=7(){E 4.z(/&/g,"&1L;").z(/</g,"&1M;").z(/>/g,"&1N;").z(/"/g,"&1O;")};E 4.1P(7(){3(6(4).5()=="")6(4).5(r.I);2 n=u;2 o=6(4);2 p=0;6(4).1Q(7(){6(4).N("O",r.1b)}).1R(7(){6(4).N("O",r.H)}).14(7(){p++;3(!n){n=1S;2 f=6(4).5();2 g=(r.11)?r.1h+\' \'+r.1j:\'\';3(f==r.I)6(4).5(\'\');3(r.G=="15"){2 h=\'<15 16="17" y="A" 1T="\'+r.1a+\'" 1U="\'+r.19+\'">\'+6(4).x().D().F()+\'</15>\'}v 3(r.G=="x"){2 h=\'<Y K="x" 16="17" y="A" 9="\'+6(4).x().D().F()+\'" />\'}v 3(r.G=="P"){2 j=r.18.1r(\',\');2 h=\'<P 16="17" y="A"><Q 9="">\'+r.1e+\'</Q>\';1V(2 i=0;i<j.1W;i++){2 k=j[i].1r(\':\');2 l=k[1]||k[0];2 m=l==f?\'1s="1s" \':\'\';h+=\'<Q \'+m+\'9="\'+l.D().F()+\'">\'+k[0].D().F()+\'</Q>\'}h+=\'</P>\'}6(4).5(\'<t y="1X" 1Y="1Z: 20; 21: 0; 22: 0;">\'+h+\' \'+g+\'</t>\')}3(p==1){7 R(){n=u;p=0;o.N("O",r.H);o.5(f);E u}7 S(){o.N("O",r.H);2 c=6(4);2 d=(c.23(\'t\'))?c.8(0).1t():c.24().8(0).1t();3(r.B!=""){2 e=\'<26 1o="\'+r.B+\'" 28="1d..." />\'}v{2 e=r.1c}o.5(e);3(r.w!=""){r.w="&"+r.w}3(r.12){5=r.12(o.1u("1v"),d,f,r.w);n=u;p=0;3(5){o.5(5||d)}v{13("1m J C 9: "+d);o.5(f)}}v 3(r.1g&&(d==""||d==29)){n=u;p=0;o.5(f);13("1n: 2a 2b 2c a 9 J C 4 2d")}v{6.2e({T:r.T,K:"2f",2g:r.W+\'=\'+d+\'&\'+r.V+\'=\'+o.1u("1v")+r.w+\'&\'+r.X+\'=\'+f,2h:"5",2i:7(a){n=u;p=0},L:7(a){2 b=a||r.I;o.5(b);3(r.L)r.L(a,o)},M:7(a){o.5(f);3(r.M)r.M(a,o)}})}E u}o.8("t").8(".A").2j().P();o.8("t").8(".1k").14(R);o.8("t").8(".1i").14(S);3(!r.11){3(r.1l=="C")o.8("t").8(".A").1w(S);v o.8("t").8(".A").1w(R)}$(2k).2l(7(a){3(a.2m==27){R()}});o.8("t").Z(S)}})})};',62,147,'||var|if|this|html|jQuery|function|children|value||||||||||||||||||||form|false|else|params|text|class|replace|inplace_field|saving_image|save|trim|return|escape_html|field_type|bg_out|default_text|to|type|success|error|css|background|select|option|cancelAction|saveAction|url|null|element_id|update_value|original_html|input|submit||show_buttons|callback|alert|dblclick|textarea|name|inplace_value|select_options|textarea_cols|textarea_rows|bg_over|saving_text|Saving|select_text|new|value_required|save_button|inplace_save|cancel_button|inplace_cancel|on_blur|Failed|Error|src|String|prototype|split|selected|val|attr|id|blur|fn|editInPlace|ffc|transparent|Click|here|add|Choose|Save|Cancel|responseText|Unspecified|extend|Image|amp|lt|gt|quot|each|mouseover|mouseout|true|rows|cols|for|length|inplace_form|style|display|inline|margin|padding|is|parent||img||alt|undefined|You|must|enter|field|ajax|POST|data|dataType|complete|focus|document|keyup|keyCode'.split('|'),0,{}))
$(document).ready(function(){
  // Using a callback function to update 2 divs
  $(".taskname").editInPlace({
      url: "app/mocks/work/worktasks.json",
      callback: function(original_element, html){
          return(html);
      }
  });
});


