// Generated from /media/yunhai/Life/GitHub/myzlogo/src/lib/parser/UCBLogo.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,26,333,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,
4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,
12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,
2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,
27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,7,33,2,34,
7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,2,40,7,40,2,41,7,
41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,7,46,2,47,7,47,2,48,7,48,
2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,
56,7,56,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,
1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,141,8,5,5,5,143,8,5,10,5,12,5,146,
9,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,155,8,5,5,5,157,8,5,10,5,12,5,160,9,
5,3,5,162,8,5,1,6,1,6,1,6,1,6,3,6,168,8,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,
8,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,
1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,
21,1,21,1,21,1,21,1,21,1,21,3,21,213,8,21,5,21,215,8,21,10,21,12,21,218,
9,21,1,22,4,22,221,8,22,11,22,12,22,222,1,22,1,22,4,22,227,8,22,11,22,12,
22,228,3,22,231,8,22,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,5,24,241,8,
24,10,24,12,24,244,9,24,1,25,1,25,1,25,1,26,1,26,5,26,251,8,26,10,26,12,
26,254,9,26,1,27,3,27,257,8,27,1,27,1,27,3,27,261,8,27,1,27,1,27,1,28,3,
28,266,8,28,1,28,1,28,3,28,270,8,28,1,29,4,29,273,8,29,11,29,12,29,274,1,
30,4,30,278,8,30,11,30,12,30,279,1,31,1,31,1,32,1,32,1,33,1,33,1,34,1,34,
1,35,1,35,1,36,1,36,1,37,1,37,1,38,1,38,1,39,1,39,1,40,1,40,1,41,1,41,1,
42,1,42,1,43,1,43,1,44,1,44,1,45,1,45,1,46,1,46,1,47,1,47,1,48,1,48,1,49,
1,49,1,50,1,50,1,51,1,51,1,52,1,52,1,53,1,53,1,54,1,54,1,55,1,55,1,56,1,
56,0,0,57,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,
27,14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,49,25,
51,26,53,0,55,0,57,0,59,0,61,0,63,0,65,0,67,0,69,0,71,0,73,0,75,0,77,0,79,
0,81,0,83,0,85,0,87,0,89,0,91,0,93,0,95,0,97,0,99,0,101,0,103,0,105,0,107,
0,109,0,111,0,113,0,1,0,40,6,0,9,10,13,13,32,32,59,59,91,91,93,93,7,0,9,
10,13,13,32,32,59,59,91,91,93,93,126,126,7,0,9,9,32,32,40,41,59,59,91,91,
93,93,126,126,6,0,9,10,13,13,32,32,59,59,123,123,125,125,5,0,9,10,13,13,
32,32,59,59,125,126,6,0,9,9,32,32,40,41,59,59,123,123,125,126,8,0,9,10,13,
13,32,32,40,41,59,59,91,91,93,93,126,126,1,0,48,57,13,0,9,10,13,13,32,32,
34,34,40,43,45,45,47,47,58,58,60,62,91,91,93,93,123,123,125,125,11,0,9,10,
13,13,32,32,40,43,45,45,47,47,60,62,91,91,93,93,123,123,125,125,11,0,9,10,
13,13,32,32,40,43,45,45,47,47,59,62,91,91,93,93,123,123,125,126,3,0,10,10,
13,13,126,126,2,0,9,9,32,32,3,0,9,10,13,13,32,32,2,0,65,65,97,97,2,0,66,
66,98,98,2,0,67,67,99,99,2,0,68,68,100,100,2,0,69,69,101,101,2,0,70,70,102,
102,2,0,71,71,103,103,2,0,72,72,104,104,2,0,73,73,105,105,2,0,74,74,106,
106,2,0,75,75,107,107,2,0,76,76,108,108,2,0,77,77,109,109,2,0,78,78,110,
110,2,0,79,79,111,111,2,0,80,80,112,112,2,0,81,81,113,113,2,0,82,82,114,
114,2,0,83,83,115,115,2,0,84,84,116,116,2,0,85,85,117,117,2,0,86,86,118,
118,2,0,87,87,119,119,2,0,88,88,120,120,2,0,89,89,121,121,2,0,90,90,122,
122,330,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,
1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,
0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,
0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,
45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,1,115,1,0,0,0,3,117,1,
0,0,0,5,119,1,0,0,0,7,122,1,0,0,0,9,126,1,0,0,0,11,161,1,0,0,0,13,167,1,
0,0,0,15,171,1,0,0,0,17,174,1,0,0,0,19,177,1,0,0,0,21,180,1,0,0,0,23,183,
1,0,0,0,25,185,1,0,0,0,27,187,1,0,0,0,29,189,1,0,0,0,31,191,1,0,0,0,33,193,
1,0,0,0,35,195,1,0,0,0,37,197,1,0,0,0,39,200,1,0,0,0,41,203,1,0,0,0,43,206,
1,0,0,0,45,220,1,0,0,0,47,232,1,0,0,0,49,235,1,0,0,0,51,245,1,0,0,0,53,248,
1,0,0,0,55,256,1,0,0,0,57,269,1,0,0,0,59,272,1,0,0,0,61,277,1,0,0,0,63,281,
1,0,0,0,65,283,1,0,0,0,67,285,1,0,0,0,69,287,1,0,0,0,71,289,1,0,0,0,73,291,
1,0,0,0,75,293,1,0,0,0,77,295,1,0,0,0,79,297,1,0,0,0,81,299,1,0,0,0,83,301,
1,0,0,0,85,303,1,0,0,0,87,305,1,0,0,0,89,307,1,0,0,0,91,309,1,0,0,0,93,311,
1,0,0,0,95,313,1,0,0,0,97,315,1,0,0,0,99,317,1,0,0,0,101,319,1,0,0,0,103,
321,1,0,0,0,105,323,1,0,0,0,107,325,1,0,0,0,109,327,1,0,0,0,111,329,1,0,
0,0,113,331,1,0,0,0,115,116,5,40,0,0,116,2,1,0,0,0,117,118,5,41,0,0,118,
4,1,0,0,0,119,120,3,101,50,0,120,121,3,91,45,0,121,6,1,0,0,0,122,123,3,71,
35,0,123,124,3,89,44,0,124,125,3,69,34,0,125,8,1,0,0,0,126,127,5,46,0,0,
127,128,3,87,43,0,128,129,3,63,31,0,129,130,3,67,33,0,130,131,3,97,48,0,
131,132,3,91,45,0,132,10,1,0,0,0,133,134,4,5,0,0,134,144,8,0,0,0,135,143,
8,1,0,0,136,143,3,55,27,0,137,140,5,92,0,0,138,141,7,2,0,0,139,141,3,57,
28,0,140,138,1,0,0,0,140,139,1,0,0,0,141,143,1,0,0,0,142,135,1,0,0,0,142,
136,1,0,0,0,142,137,1,0,0,0,143,146,1,0,0,0,144,142,1,0,0,0,144,145,1,0,
0,0,145,162,1,0,0,0,146,144,1,0,0,0,147,148,4,5,1,0,148,158,8,3,0,0,149,
157,8,4,0,0,150,157,3,55,27,0,151,154,5,92,0,0,152,155,7,5,0,0,153,155,3,
57,28,0,154,152,1,0,0,0,154,153,1,0,0,0,155,157,1,0,0,0,156,149,1,0,0,0,
156,150,1,0,0,0,156,151,1,0,0,0,157,160,1,0,0,0,158,156,1,0,0,0,158,159,
1,0,0,0,159,162,1,0,0,0,160,158,1,0,0,0,161,133,1,0,0,0,161,147,1,0,0,0,
162,12,1,0,0,0,163,168,3,53,26,0,164,168,3,57,28,0,165,168,3,59,29,0,166,
168,3,55,27,0,167,163,1,0,0,0,167,164,1,0,0,0,167,165,1,0,0,0,167,166,1,
0,0,0,168,169,1,0,0,0,169,170,6,6,0,0,170,14,1,0,0,0,171,172,5,123,0,0,172,
173,6,7,1,0,173,16,1,0,0,0,174,175,5,125,0,0,175,176,6,8,2,0,176,18,1,0,
0,0,177,178,5,91,0,0,178,179,6,9,3,0,179,20,1,0,0,0,180,181,5,93,0,0,181,
182,6,10,4,0,182,22,1,0,0,0,183,184,5,45,0,0,184,24,1,0,0,0,185,186,5,43,
0,0,186,26,1,0,0,0,187,188,5,42,0,0,188,28,1,0,0,0,189,190,5,47,0,0,190,
30,1,0,0,0,191,192,5,60,0,0,192,32,1,0,0,0,193,194,5,62,0,0,194,34,1,0,0,
0,195,196,5,61,0,0,196,36,1,0,0,0,197,198,5,60,0,0,198,199,5,61,0,0,199,
38,1,0,0,0,200,201,5,62,0,0,201,202,5,61,0,0,202,40,1,0,0,0,203,204,5,60,
0,0,204,205,5,62,0,0,205,42,1,0,0,0,206,216,5,34,0,0,207,215,8,6,0,0,208,
215,3,55,27,0,209,212,5,92,0,0,210,213,7,2,0,0,211,213,3,57,28,0,212,210,
1,0,0,0,212,211,1,0,0,0,213,215,1,0,0,0,214,207,1,0,0,0,214,208,1,0,0,0,
214,209,1,0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,44,1,
0,0,0,218,216,1,0,0,0,219,221,7,7,0,0,220,219,1,0,0,0,221,222,1,0,0,0,222,
220,1,0,0,0,222,223,1,0,0,0,223,230,1,0,0,0,224,226,5,46,0,0,225,227,7,7,
0,0,226,225,1,0,0,0,227,228,1,0,0,0,228,226,1,0,0,0,228,229,1,0,0,0,229,
231,1,0,0,0,230,224,1,0,0,0,230,231,1,0,0,0,231,46,1,0,0,0,232,233,5,58,
0,0,233,234,3,49,24,0,234,48,1,0,0,0,235,242,8,8,0,0,236,241,8,9,0,0,237,
241,3,55,27,0,238,239,5,92,0,0,239,241,7,10,0,0,240,236,1,0,0,0,240,237,
1,0,0,0,240,238,1,0,0,0,241,244,1,0,0,0,242,240,1,0,0,0,242,243,1,0,0,0,
243,50,1,0,0,0,244,242,1,0,0,0,245,246,9,0,0,0,246,247,6,25,5,0,247,52,1,
0,0,0,248,252,5,59,0,0,249,251,8,11,0,0,250,249,1,0,0,0,251,254,1,0,0,0,
252,250,1,0,0,0,252,253,1,0,0,0,253,54,1,0,0,0,254,252,1,0,0,0,255,257,3,
53,26,0,256,255,1,0,0,0,256,257,1,0,0,0,257,258,1,0,0,0,258,260,5,126,0,
0,259,261,3,59,29,0,260,259,1,0,0,0,260,261,1,0,0,0,261,262,1,0,0,0,262,
263,3,57,28,0,263,56,1,0,0,0,264,266,5,13,0,0,265,264,1,0,0,0,265,266,1,
0,0,0,266,267,1,0,0,0,267,270,5,10,0,0,268,270,5,13,0,0,269,265,1,0,0,0,
269,268,1,0,0,0,270,58,1,0,0,0,271,273,7,12,0,0,272,271,1,0,0,0,273,274,
1,0,0,0,274,272,1,0,0,0,274,275,1,0,0,0,275,60,1,0,0,0,276,278,7,13,0,0,
277,276,1,0,0,0,278,279,1,0,0,0,279,277,1,0,0,0,279,280,1,0,0,0,280,62,1,
0,0,0,281,282,7,14,0,0,282,64,1,0,0,0,283,284,7,15,0,0,284,66,1,0,0,0,285,
286,7,16,0,0,286,68,1,0,0,0,287,288,7,17,0,0,288,70,1,0,0,0,289,290,7,18,
0,0,290,72,1,0,0,0,291,292,7,19,0,0,292,74,1,0,0,0,293,294,7,20,0,0,294,
76,1,0,0,0,295,296,7,21,0,0,296,78,1,0,0,0,297,298,7,22,0,0,298,80,1,0,0,
0,299,300,7,23,0,0,300,82,1,0,0,0,301,302,7,24,0,0,302,84,1,0,0,0,303,304,
7,25,0,0,304,86,1,0,0,0,305,306,7,26,0,0,306,88,1,0,0,0,307,308,7,27,0,0,
308,90,1,0,0,0,309,310,7,28,0,0,310,92,1,0,0,0,311,312,7,29,0,0,312,94,1,
0,0,0,313,314,7,30,0,0,314,96,1,0,0,0,315,316,7,31,0,0,316,98,1,0,0,0,317,
318,7,32,0,0,318,100,1,0,0,0,319,320,7,33,0,0,320,102,1,0,0,0,321,322,7,
34,0,0,322,104,1,0,0,0,323,324,7,35,0,0,324,106,1,0,0,0,325,326,7,36,0,0,
326,108,1,0,0,0,327,328,7,37,0,0,328,110,1,0,0,0,329,330,7,38,0,0,330,112,
1,0,0,0,331,332,7,39,0,0,332,114,1,0,0,0,24,0,140,142,144,154,156,158,161,
167,212,214,216,222,228,230,240,242,252,256,260,265,269,274,279,6,6,0,0,
1,7,0,1,8,1,1,9,2,1,10,3,1,25,4];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class UCBLogoLexer extends antlr4.Lexer {

    static grammarFileName = "UCBLogo.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'('", "')'", null, null, null, null, null, 
                         "'{'", "'}'", "'['", "']'", "'-'", "'+'", "'*'", 
                         "'/'", "'<'", "'>'", "'='", "'<='", "'>='", "'<>'" ];
	static symbolicNames = [ null, null, null, "TO", "END", "MACRO", "WORD", 
                          "SKIP_", "OPEN_ARRAY", "CLOSE_ARRAY", "OPEN_LIST", 
                          "CLOSE_LIST", "MINUS", "PLUS", "MULT", "DIV", 
                          "LT", "GT", "EQ", "LT_EQ", "GT_EQ", "NOT_EQ", 
                          "QUOTED_WORD", "NUMBER", "VARIABLE", "NAME", "ANY" ];
	static ruleNames = [ "T__0", "T__1", "TO", "END", "MACRO", "WORD", "SKIP_", 
                      "OPEN_ARRAY", "CLOSE_ARRAY", "OPEN_LIST", "CLOSE_LIST", 
                      "MINUS", "PLUS", "MULT", "DIV", "LT", "GT", "EQ", 
                      "LT_EQ", "GT_EQ", "NOT_EQ", "QUOTED_WORD", "NUMBER", 
                      "VARIABLE", "NAME", "ANY", "COMMENT", "LINE_CONTINUATION", 
                      "LINE_BREAK", "SPACES", "SPACE_CHARS", "A", "B", "C", 
                      "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                      "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", 
                      "X", "Y", "Z" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.atn.PredictionContextCache());

          // Counters that keep track of how deep the lexer is currently in a list
          // or array. Depending on this value, a "FOO" is either tokenized as a NAME
          // (when not inside a list or array) or else as a WORD (when inside a list
          // or array).
          this.listDepth = 0;
          this.arrayDepth = 0;

    }
}

UCBLogoLexer.EOF = antlr4.Token.EOF;
UCBLogoLexer.T__0 = 1;
UCBLogoLexer.T__1 = 2;
UCBLogoLexer.TO = 3;
UCBLogoLexer.END = 4;
UCBLogoLexer.MACRO = 5;
UCBLogoLexer.WORD = 6;
UCBLogoLexer.SKIP_ = 7;
UCBLogoLexer.OPEN_ARRAY = 8;
UCBLogoLexer.CLOSE_ARRAY = 9;
UCBLogoLexer.OPEN_LIST = 10;
UCBLogoLexer.CLOSE_LIST = 11;
UCBLogoLexer.MINUS = 12;
UCBLogoLexer.PLUS = 13;
UCBLogoLexer.MULT = 14;
UCBLogoLexer.DIV = 15;
UCBLogoLexer.LT = 16;
UCBLogoLexer.GT = 17;
UCBLogoLexer.EQ = 18;
UCBLogoLexer.LT_EQ = 19;
UCBLogoLexer.GT_EQ = 20;
UCBLogoLexer.NOT_EQ = 21;
UCBLogoLexer.QUOTED_WORD = 22;
UCBLogoLexer.NUMBER = 23;
UCBLogoLexer.VARIABLE = 24;
UCBLogoLexer.NAME = 25;
UCBLogoLexer.ANY = 26;

UCBLogoLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 7:
		this.OPEN_ARRAY_action(localctx, actionIndex);
		break;
	case 8:
		this.CLOSE_ARRAY_action(localctx, actionIndex);
		break;
	case 9:
		this.OPEN_LIST_action(localctx, actionIndex);
		break;
	case 10:
		this.CLOSE_LIST_action(localctx, actionIndex);
		break;
	case 25:
		this.ANY_action(localctx, actionIndex);
		break;
	default:
		throw "No registered action for:" + ruleIndex;
	}
};


UCBLogoLexer.prototype.OPEN_ARRAY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 0:
		this.arrayDepth++;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

UCBLogoLexer.prototype.CLOSE_ARRAY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 1:
		this.arrayDepth--;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

UCBLogoLexer.prototype.OPEN_LIST_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 2:
		this.listDepth++;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

UCBLogoLexer.prototype.CLOSE_LIST_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 3:
		this.listDepth--;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

UCBLogoLexer.prototype.ANY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 4:
		console.log("unexpected char: " + getText());
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};
UCBLogoLexer.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch (ruleIndex) {
		case 5:
			return this.WORD_sempred(localctx, predIndex);
    	default:
    		throw "No registered predicate for:" + ruleIndex;
    }
};

UCBLogoLexer.prototype.WORD_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.listDepth > 0;
		case 1:
			return this.arrayDepth > 0;
		default:
			throw "No predicate with index:" + predIndex;
	}
};




