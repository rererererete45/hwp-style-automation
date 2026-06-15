```javascript
/*
 * HWP Style Automation
 *
 * 문단 앞의 스타일 태그를 검색하여
 * 태그를 삭제하고 해당 문단에 한글 스타일을 적용한다.
 *
 * 일부 한글 환경에서 글꼴까지 완전히 적용되도록
 * 같은 스타일을 두 번 연속 적용한다.
 */

function OnScriptMacro_Style()
{
    /*
     * 아래 styleMap을 실제 사용할 스타일에 맞게 수정한다.
     *
     * tag
     * 문서에 입력한 스타일 태그
     *
     * styleId
     * 한글 문서에서 사용하는 스타일 내부 번호
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

    /*
     * 등록된 태그를 순서대로 처리한다.
     */
    for (i = 0; i < styleMap.length; i++)
    {
        targetTag = styleMap[i].tag;
        targetStyle = styleMap[i].styleId;

        /*
         * 태그별 검색을 문서 처음부터 시작한다.
         */
        HAction.Run("MoveDocBegin");

        /*
         * 찾기 조건을 초기화한다.
         */
        HAction.GetDefault(
            "RepeatFind",
            HParameterSet.HFindReplace.HSet
        );

        /*
         * 찾을 태그를 설정한다.
         */
        HParameterSet.HFindReplace.FindString =
            targetTag;

        /*
         * 사용 환경에서 정상 작동한 검색 방향값.
         *
         * 한글 버전이나 환경에 따라 조정이 필요할 수 있다.
         */
        HParameterSet.HFindReplace.Direction =
            1;

        /*
         * 검색 완료 메시지를 표시하지 않는다.
         */
        HParameterSet.HFindReplace.IgnoreMessage =
            1;

        /*
         * 검색 옵션
         */
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
         * 같은 태그가 남아 있는 동안 반복한다.
         */
        while (
            HAction.Execute(
                "RepeatFind",
                HParameterSet.HFindReplace.HSet
            )
        )
        {
            /*
             * 현재 선택된 태그를 삭제한다.
             */
            HAction.Run("Delete");

            /*
             * 태그가 있던 문단의 시작으로 이동한다.
             */
            HAction.Run("MoveParaBegin");

            /*
             * 첫 번째 스타일 적용
             */
            ApplyRealStyle(targetStyle);

            /*
             * 문단 위치를 다시 잡는다.
             */
            HAction.Run("MoveParaBegin");

            /*
             * 두 번째 스타일 적용
             *
             * 글꼴, 글자 크기, 문단 모양이
             * 완전히 반영되지 않는 현상을 보완한다.
             */
            ApplyRealStyle(targetStyle);

            /*
             * 다음 태그 검색을 위해
             * 현재 문단 끝으로 이동한다.
             */
            HAction.Run("MoveParaEnd");
        }
    }

    /*
     * 모든 작업이 끝나면 문서 처음으로 이동한다.
     */
    HAction.Run("MoveDocBegin");
}


/*
 * 현재 문단에 한글 스타일을 실제로 적용한다.
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

    /*
     * 적용할 스타일 내부 번호
     */
    parameterSet.SetItem(
        "Apply",
        styleId
    );

    action.Execute(
        parameterSet
    );
}
```
