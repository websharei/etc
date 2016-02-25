/**
 * @fileOverview ���� ������Ʈ�� �����ϱ� ���� �ھ� Ŭ����
 * @version 1.0.3
 */
jindo.Component = jindo.$Class({
	/** @lends jindo.Component.prototype */

	_htEventHandler : null,
	_htOption : null,

	/**
	 * jindo.Component�� �ʱ�ȭ�Ѵ�.
	 * @class �ٸ� ������Ʈ�� ����� ����ϴ� Jindo Component�� Core
	 * @constructs  
	 */
	$init : function() {
		var aInstance = this.constructor.getInstance();
		aInstance.push(this);
		this._htEventHandler = {};
		this._htOption = {};
		this._htOption._htSetter = {};
	},
	
	/**
	 * �ɼǰ��� �����ϰų� �����´�.
	 * htCustomEventHandler �ɼ��� �����ؼ� attach() �޼ҵ带 ������� �ʰ� Ŀ���� �̺�Ʈ�ڵ鷯�� ����� �� �ִ�.
	 * @param {String} sName �ɼ��� �̸�
	 * @param {String} sValue �ɼ��� ��
	 * @return {this} ������Ʈ ��ü �ڽ�
	 * @example
var MyComponent = jindo.$Class({
	method : function() {
		alert(this.option("foo"));
	}
}).extend(jindo.Component);

var oInst = new MyComponent();
oInst.option("foo", 123); // �Ǵ� oInst.option({ foo : 123 });
oInst.method(); // ��� 123
	 * @example
//Ŀ�����̺�Ʈ�ڵ鷯 ��Ͽ���
oInst.option("htCustomEventHandler", {
	test : function(oCustomEvent) {
	
	}
});

//�̹� "htCustomEventHandler" �ɼ��� �����Ǿ��ִ� ��쿡�� ���õȴ�.
oInst.option("htCustomEventHandler", {
	change : function(oCustomEvent) {
	
	}
});
	 */
	option : function(sName, vValue) {
		switch (typeof sName) {
			case "undefined" :
				return this._htOption;
			case "string" : 
				if (typeof vValue != "undefined") {
					if (sName == "htCustomEventHandler") {
						if (typeof this._htOption[sName] == "undefined") {
							this.attach(vValue);
						} else {
							return this;
						}
					}
					
					this._htOption[sName] = vValue;
					if (typeof this._htOption._htSetter[sName] == "function") {
						this._htOption._htSetter[sName](vValue);	
					}
				} else {
					return this._htOption[sName];
				}
				break;
			case "object" :
				for(var sKey in sName) {
					if (sKey == "htCustomEventHandler") {
						if (typeof this._htOption[sKey] == "undefined") {
							this.attach(sName[sKey]);
						} else {
							continue;
						}
					}
					
					this._htOption[sKey] = sName[sKey];
					if (typeof this._htOption._htSetter[sKey] == "function") {
						this._htOption._htSetter[sKey](sName[sKey]);	
					}
				}
				break;
		}
		return this;
	},
	
	/**
	 * �ɼ��� setter �Լ��� �����ϰų� �����´�.
	 * �ɼ��� setter �Լ��� ������ �ɼ��� ����Ǹ� ����Ǵ� �Լ��̴�.
	 * @param {String} sName setter�� �̸�
	 * @param {Function} fSetter setter �Լ�
	 * @return {this} ������Ʈ ��ü �ڽ�
	 * @example
oInst.option("sMsg", "test");
oInst.optionSetter("sMsg", function(){
	alert("sMsg �ɼǰ��� ����Ǿ����ϴ�.");
});
oInst.option("sMsg", "change"); -> alert�߻�
	 * @example
//HashTable ���·� ��������
oInst.optionSetter({
	"sMsg" : function(){
	},
	"nNum" : function(){
	}
});
	 */
	optionSetter : function(sName, fSetter) {
		switch (typeof sName) {
			case "undefined" :
				return this._htOption._htSetter;
			case "string" : 
				if (typeof fSetter != "undefined") {
					this._htOption._htSetter[sName] = jindo.$Fn(fSetter, this).bind();
				} else {
					return this._htOption._htSetter[sName];
				}
				break;
			case "object" :
				for(var sKey in sName) {
					this._htOption._htSetter[sKey] = jindo.$Fn(sName[sKey], this).bind();
				}
				break;
		}
		return this;
	},
	
	/**
	 * �̺�Ʈ�� �߻���Ų��.
	 * @param {Object} sEvent Ŀ�����̺�Ʈ��
	 * @param {Object} oEvent Ŀ�����̺�Ʈ �ڵ鷯�� ���޵Ǵ� ��ü.
	 * @return {Boolean} �ڵ鷯�� Ŀ�����̺�Ʈ��ü���� stop�޼ҵ尡 ����Ǹ� false�� ����
	 * @example
//Ŀ���� �̺�Ʈ�� �߻���Ű�� ����
var MyComponent = jindo.$Class({
	method : function() {
		this.fireEvent('happened', {
			sHello : 'world',
			sAbc : '123'
		});
	}
}).extend(jindo.Component);

var oInst = new MyComponent().attach({
	happened : function(oCustomEvent) {
		alert(eCustomEvent.sHello + '/' + oCustomEvent.nAbc); // ��� : world/123
	}
};

<button onclick="oInst.method(event);">Click me</button> 
	 */
	fireEvent : function(sEvent, oEvent) {
		oEvent = oEvent || {};
		var fInlineHandler = this['on' + sEvent],
			aHandlerList = this._htEventHandler[sEvent] || [],
			bHasInlineHandler = typeof fInlineHandler == "function",
			bHasHandlerList = aHandlerList.length > 0;
			
		if (!bHasInlineHandler && !bHasHandlerList) {
			return true;
		}
		aHandlerList = aHandlerList.concat(); //fireEvent����� �ڵ鷯 ���ο��� detach�Ǿ ���ʼ������ �ڵ鷯����Ʈ�� ��� ����
		
		oEvent.sType = sEvent;
		if (typeof oEvent._aExtend == 'undefined') {
			oEvent._aExtend = [];
			oEvent.stop = function(){
				if (oEvent._aExtend.length > 0) {
					oEvent._aExtend[oEvent._aExtend.length - 1].bCanceled = true;
				}
			};
		}
		oEvent._aExtend.push({
			sType: sEvent,
			bCanceled: false
		});
		
		var aArg = [oEvent], 
			i, nLen;
			
		for (i = 2, nLen = arguments.length; i < nLen; i++){
			aArg.push(arguments[i]);
		}
		
		if (bHasInlineHandler) {
			fInlineHandler.apply(this, aArg);
		}
	
		if (bHasHandlerList) {
			var fHandler;
			for (i = 0, fHandler; (fHandler = aHandlerList[i]); i++) {
				fHandler.apply(this, aArg);
			}
		}
		
		return !oEvent._aExtend.pop().bCanceled;
	},

	/**
	 * Ŀ���� �̺�Ʈ �ڵ鷯�� ����Ѵ�.
	 * @param {Object} sEvent
	 * @param {Object} fHandlerToAttach
	 * @return {this} ������Ʈ ��ü �ڽ�
	 * @example
//�̺�Ʈ ��� ��� ����
//�Ʒ�ó�� ����ϸ� appear ��� ����� �̺�Ʈ �ڵ鷯�� �� 3���� ��ϵǾ� �ش� �̺�Ʈ�� �߻���Ű�� ������ �ڵ鷯 �Լ��� ��� �����.
//attach �� ���� ����Ҷ��� �̺�Ʈ�� 'on' �� ������ �Ϳ� ����.
function fpHandler1(oEvent) { .... };
function fpHandler2(oEvent) { .... };

var oInst = new MyComponent();
oInst.onappear = fpHandler1; // ���� ���
oInst.attach('appear', fpHandler1); // attach �Լ��� ���� ���
oInst.attach({
	appear : fpHandler1,
	more : fpHandler2
});
	 */
	attach : function(sEvent, fHandlerToAttach) {
		if (arguments.length == 1) {

			jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler, sEvent) {
				this.attach(sEvent, fHandler);
			}, this).bind());
		
			return this;
		}

		var aHandler = this._htEventHandler[sEvent];

		if (typeof aHandler == 'undefined'){
			aHandler = this._htEventHandler[sEvent] = [];
		}

		aHandler.push(fHandlerToAttach);

		return this;
	},
	
	/**
	 * Ŀ���� �̺�Ʈ �ڵ鷯�� �����Ѵ�.
	 * @param {Object} sEvent
	 * @param {Object} fHandlerToDetach
	 * @return {this} ������Ʈ ��ü �ڽ�
	 * @example
//�̺�Ʈ ���� ����
oInst.onappear = null; // ���� ����
oInst.detach('appear', fpHandler1); // detach �Լ��� ���� ����
oInst.detach({
	appear : fpHandler1,
	more : fpHandler2
});
	 */
	detach : function(sEvent, fHandlerToDetach) {
		if (arguments.length == 1) {
			jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler, sEvent) {
				this.detach(sEvent, fHandler);
			}, this).bind());
		
			return this;
		}

		var aHandler = this._htEventHandler[sEvent];
		if (aHandler) {
			for (var i = 0, fHandler; (fHandler = aHandler[i]); i++) {
				if (fHandler === fHandlerToDetach) {
					aHandler = aHandler.splice(i, 1);
					break;
				}
			}
		}

		return this;
	},
	
	/**
	 * ��ϵ� ��� Ŀ���� �̺�Ʈ �ڵ鷯�� �����Ѵ�.
	 * @param {String} sEvent �̺�Ʈ��. ������ ��� ��ϵ� Ŀ���� �̺�Ʈ �ڵ鷯�� �����Ѵ�. 
	 * @return {this} ������Ʈ ��ü �ڽ�
	 * @example
//"show" Ŀ�����̺�Ʈ �ڵ鷯 ��� ����
oInst.detachAll("show");

//��� Ŀ�����̺�Ʈ �ڵ鷯 ����
oInst.detachAll();
	 */
	detachAll : function(sEvent) {
		var aHandler = this._htEventHandler;
		
		if (arguments.length) {
			
			if (typeof aHandler[sEvent] == 'undefined') {
				return this;
			}
	
			delete aHandler[sEvent];
	
			return this;
		}	
		
		for (var o in aHandler) {
			delete aHandler[o];
		}
		return this;				
	}
});

/**
 * �ټ��� ������Ʈ�� �ϰ� �����ϴ� Static Method
 * @param {Array} aObject ���ؿ�����Ʈ�� �迭
 * @param {HashTable} htOption �ɼǰ�ü�� �迭
 * @return {Array} ������ ������Ʈ ��ü �迭
 * @example
var Instance = jindo.Component.factory(
	cssquery('li'),
	{
		foo : 123,
		bar : 456
	}
);
 */
jindo.Component.factory = function(aObject, htOption) {
	var aReturn = [],
		oInstance;

	if (typeof htOption == "undefined") {
		htOption = {};
	}
	
	for(var i = 0, el; (el = aObject[i]); i++) {
		oInstance = new this(el, htOption);
		aReturn[aReturn.length] = oInstance;
	}

	return aReturn;
};

/**
 * ������Ʈ�� ������ �ν��Ͻ��� �����Ѵ�.
 * @return {Array} ������ �ν��Ͻ��� �迭
 */
jindo.Component.getInstance = function(){
	if (typeof this._aInstance == "undefined") {
		this._aInstance = [];
	}
	return this._aInstance;
};
