function removeCommentsFromCppCode(cppCode) {
    // Remove single-line comments (// ...)
    let codeWithoutSingleLineComments = cppCode.replace(/\/\/.*?\n/g, '');
  
    // Remove multi-line comments (/* ... */)
    let codeWithoutMultiLineComments = codeWithoutSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, '');
  
    // Replace line breaks with spaces
    let codeSingleLine = codeWithoutMultiLineComments.replace(/\n/g, ' ');
  
    return codeSingleLine;
  }
  
  // Example usage:
  const cppCodeWithComments = `
  class Solution{
    public:
    bool f(int i,int j,string wild,string pattern,vector<vector<int>> &dp)
    {
        if(j==pattern.size())
        {
            while(i<wild.size())
            {
                if(wild[i]!='*')
                return false;
                i++;
            }
            
            return true;
        }
        
        
        bool fl=false;
        if(wild[i]==pattern[j]||wild[i]=='?')
        {
            return f(i+1,j+1,wild,pattern,dp);
        }
        else if(wild[i]=='*')
        {
            for(int k=j;k<=pattern.size();k++)
            {
                fl=fl||f(i+1,k,wild,pattern,dp);
            }
            return fl;
           
        }
        else if(wild[i]!=wild[j])
        {
            return false;
        }
        
        
    }
    
    bool match(string wild, string pattern)
    {
        // code here
        int n=wild.size();
        int m=pattern.size();
        
        vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
        
        return f(0,0,wild,pattern,dp);
}

};
  `;
  
  const cppCodeWithoutCommentsSingleLine = removeCommentsFromCppCode(cppCodeWithComments);
  console.log(cppCodeWithoutCommentsSingleLine);
  