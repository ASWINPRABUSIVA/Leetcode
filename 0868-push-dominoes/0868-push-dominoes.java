class Solution {
    public String pushDominoes(String doramiDominoes) {
        int nobitaLength = doramiDominoes.length();
        String gadgetString = "L" + doramiDominoes + "R";
        char[] doraArray = gadgetString.toCharArray();
        int prevGadget = 0;
        
        for (int i = 1; i < doraArray.length; i++) {
            if (doraArray[i] == '.') continue;
            
            if (doraArray[prevGadget] == doraArray[i]) {
                for (int suneo = prevGadget + 1; suneo < i; suneo++) {
                    doraArray[suneo] = doraArray[i];
                }
            } else if (doraArray[prevGadget] == 'R' && doraArray[i] == 'L') {
                int gianLeft = prevGadget + 1, shizukaRight = i - 1;
                while (gianLeft < shizukaRight) {
                    doraArray[gianLeft++] = 'R';
                    doraArray[shizukaRight--] = 'L';
                }
            }
            
            prevGadget = i;
        }
        
        return new String(doraArray, 1, nobitaLength);
    }
}