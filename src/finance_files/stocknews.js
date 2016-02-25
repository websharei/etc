document.domain = 'naver.com';

// 장중특징주
var market_special_ticker_rcnt_gno = market_special_ticker_rcnt_gno_max = 3;
var market_special_rolling_tag = 1;
function view_market_special_ticker(mode, market_special_list_cnt)
{
	var total = market_special_list_cnt;
	var gcnt = 1;
	var li_name;
	var s_display;
	var start, end;

	if (mode == 'next')
		market_special_ticker_rcnt_gno++;
	else if (mode == 'prev')
		market_special_ticker_rcnt_gno--;
	market_special_ticker_rcnt_gno = (market_special_ticker_rcnt_gno + market_special_ticker_rcnt_gno_max) % market_special_ticker_rcnt_gno_max;

	start = market_special_ticker_rcnt_gno * gcnt;
	end = start + gcnt;
	for (i=0; i<total; i++)
	{
		li_name = 'market_special_' + i;
		s_display = 'none';
		if (i>=start && i<end) s_display = '';

		document.getElementById(li_name).style.display = s_display;
	}
	
}

function view_market_special_pause() 
{
	 market_special_rolling_tag = 0;
}

function view_market_special_start() 
{
	 market_special_rolling_tag = 1;
}

function view_market_special_rolling(market_special_list_cnt)
{
	if( market_special_rolling_tag == 1)
		view_market_special_ticker('next', market_special_list_cnt);
	setTimeout('view_market_special_rolling('+ market_special_list_cnt +')', 10000);
}

function set_market_special_rolling(market_special_list_cnt)
{
	if( market_special_list_cnt != 3)
		market_special_ticker_rcnt_gno = market_special_ticker_rcnt_gno_max = market_special_list_cnt;

	if( market_special_rolling_tag == 1)
		view_market_special_ticker('next', market_special_list_cnt);
	setTimeout('view_market_special_rolling('+ market_special_list_cnt +')', 10000);
}

// 공시정보
var market_notice_ticker_rcnt_gno = market_notice_ticker_rcnt_gno_max = 10;
var  market_notice_rolling_tag = 1;
function view_market_notice_ticker(mode)
{
	var total = 10;
	var gcnt = 1;
	var li_name;
	var s_display;
	var start, end;

	if (mode == 'next')
		market_notice_ticker_rcnt_gno++;
	else if (mode == 'prev')
		market_notice_ticker_rcnt_gno--;
	market_notice_ticker_rcnt_gno = (market_notice_ticker_rcnt_gno + market_notice_ticker_rcnt_gno_max) % market_notice_ticker_rcnt_gno_max;

	start = market_notice_ticker_rcnt_gno * gcnt;
	end = start + gcnt;
	for (i=0; i<total; i++)
	{
		li_name = 'market_notice_'+i;
		s_display = 'none';
		if (i>=start && i<end) s_display = 'block';
		document.getElementById(li_name).style.display = s_display;
	}
	
}

function view_market_notice_pause() 
{
	 market_notice_rolling_tag = 0;
}

function view_market_notice_start() 
{
	 market_notice_rolling_tag = 1;
}

function view_market_notice_rolling()
{
	if( market_notice_rolling_tag == 1)
		view_market_notice_ticker('next');
	setTimeout('view_market_notice_rolling()', 3000);
}

// 경제속보
var newsflash_rcnt_gno = newsflash_rcnt_gno_max = 10;
var newsflash_rolling_tag = 1;
function view_newsflash(mode)
{
	var total = 10;
	var gcnt = 1;
	var li_name;
	var start, end;

	if (mode == 'next') 			newsflash_rcnt_gno++;
	else if (mode == 'prev') 	newsflash_rcnt_gno--;
	newsflash_rcnt_gno = (newsflash_rcnt_gno + newsflash_rcnt_gno_max) % newsflash_rcnt_gno_max;

	start = newsflash_rcnt_gno * gcnt;
	end = start + gcnt;

	for (i=0; i<total; i++)
	{
		li_name = 'newsflash_' + i;
		s_display = 'none';
		if (i>=start && i<end) s_display = '';

		document.getElementById(li_name).style.display = s_display;
	}
}

function view_newsflash_pause() 
{
	newsflash_rolling_tag = 0;
}

function view_newsflash_start() 
{
	newsflash_rolling_tag = 1;
}

function view_newsflash_rolling()
{
	if(newsflash_rolling_tag == 1)
		view_newsflash('next');
	setTimeout('view_newsflash_rolling()', 3000);
}



// 종목뉴스 검색
function doSearch() {
	var frm = document.searchFrm;
	var query = frm.q.value.replace(/^\s*/,'').replace(/\s*$/,'');	// trim
	if(query.length == 0 || query == '종목뉴스검색') {
		alert('검색어를 입력해주세요');
		return false;
	}
	frm.q.value = query;
	return true;
}