100 GR
110 FOR X = 0 TO 3
120 FOR Y = 0 TO 39
130 COLOR = X + 4 * (INT(Y/10))
140 HLIN X*10,X*10+9 AT Y
150 NEXT
160 NEXT
200 PRINT "0=BLACK    ";
210 PRINT "1=RED     ";
220 PRINT "2=D.BLUE  ";
230 PRINT "3=PURPLE ";
240 PRINT "4=D.GREEN  ";
250 PRINT "5=GRAY 1  ";
260 PRINT "6=M.BLUE  ";
270 PRINT "7=L.BLUE ";
280 PRINT "8=BROWN    ";
290 PRINT "9=ORANGE  ";
300 PRINT "10=GRAY 2 ";
310 PRINT "11=PINK  ";
320 PRINT "12=L.GREEN ";
330 PRINT "13=YELLOW ";
340 PRINT "14=AQUA   ";
350 PRINT "15=WHITE";
360 GET A$
