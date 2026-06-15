```javascript
function OnScriptMacro_Style()
{
    /*
     * 사용하는 스타일
     *
     *  0  바탕글
     *  1  간지 제목
     *  2  개요 1 [Ⅰ.]
     *  3  개요 2 [1)]
     *  4  개요 3 [가)]
     *  5  개요 4 [①]
     *  6  개요 5 [가.]
     * 10  본문
     * 11  본문 1 (-)
     * 12  본문강조 (○)
     * 13  주의 및 참고문헌
     */

    var styleMap = [
        { tag: "[바탕글] ", styleId: 0 },
        { tag: "[간지 제목] ", styleId: 1 },

        { tag: "[개요 1] ", styleId: 2 },
        { tag: "[개요 2] ", styleId: 3 },
        { tag: "[개요 3] ", styleId: 4 },
        { tag: "[개요 4] ", styleId: 5 },
        { tag: "[개요 5] ", styleId: 6 },

        { tag: "[본문] ", styleId: 10 },
        { tag: "[본문 1 (-)] ", styleId: 11 },
        { tag: "[본문강조 (○)] ", styleId: 12 },
        { tag: "[주의 및 참고문헌] ", styleId: 13 }
    ];

    var i;
    var targetTag;
    var targetStyle;

    for (i = 0; i < styleMap.length; i++)
    {
        targetTag = styleMap[i].tag;
        targetStyle = styleMap[i].styleId;

        /*
         * 각 태그 검색을 문서 처음부터 시작
         */
        HAction.Run("MoveDocBegin");

        /*
         * 찾기 조건 초기화
         */
        HAction.GetDefault(
            "RepeatFind",
            HParameterSet.HFindReplace.HSet
        );

        HParameterSet.HFindReplace.FindString =
            targetTag;

        /*
         * 기존에 정상 작동한 검색 방향
         */
        HParameterSet.HFindReplace.Direction =
            1;

        HParameterSet.HFindReplace.IgnoreMessage =
            1;

        HParameterSet.HFindReplace.MatchCase =
            1;

        HParameterSet.HFindReplace.WholeWordOnly =
            0;

        HParameterSet.HFindReplace.UseWildCards =
            0;

        HParameterSet.HFindReplace.FindRegExp =
            0;

        HParameterSet.HFindReplace.FindJaso =
            0;

        HParameterSet.HFindReplace.FindType =
            1;

        /*
         * 같은 태그가 남아 있는 동안 반복
         */
        while (
            HAction.Execute(
                "RepeatFind",
                HParameterSet.HFindReplace.HSet
            )
        )
        {
            /*
             * 현재 선택된 태그 삭제
             */
            HAction.Run("Delete");

            /*
             * 태그가 있던 문단 시작으로 이동
             */
            HAction.Run("MoveParaBegin");

            /*
             * 첫 번째 스타일 적용
             */
            ApplyRealStyle(targetStyle);

            /*
             * 현재 문단 위치를 다시 확실하게 지정
             */
            HAction.Run("MoveParaBegin");

            /*
             * 두 번째 스타일 적용
             * 글꼴·문단 모양까지 완전히 반영하기 위한 처리
             */
            ApplyRealStyle(targetStyle);

            /*
             * 다음 태그 검색을 위해 문단 끝으로 이동
             */
            HAction.Run("MoveParaEnd");
        }
    }

    /*
     * 작업 완료 후 문서 처음으로 이동
     */
    HAction.Run("MoveDocBegin");
}


/*
 * 현재 문단에 한글 스타일을 실제로 적용
 */
function ApplyRealStyle(styleId)
{
    var action;
    var parameterSet;

    action =
        CreateAction("Style");

    parameterSet =
        CreateSet("Style");

    action.GetDefault(
        parameterSet
    );

    parameterSet.SetItem(
        "Apply",
        styleId
    );

    action.Execute(
        parameterSet
    );
}
```
