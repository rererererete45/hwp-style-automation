/*

* 한글 스타일 자동 적용 스크립트 매크로
*
* 사용 방법
* 1. 문서의 각 문단 앞에 스타일 태그를 작성한다.
* 2. styleMap의 태그명과 스타일 내부 번호를 확인한다.
* 3. 한글 스크립트 매크로에서 이 코드를 실행한다.
*
* 주의
* * 태그 뒤에는 공백 한 칸이 포함되어야 한다.
* * styleId는 실제 한글 스타일 내부 번호에 맞게 수정해야 한다.
* * 글꼴까지 반영하기 위해 같은 스타일을 두 번 적용한다.
    */

function OnScriptMacro_Style()
{
var styleMap = [
{ tag: "[간지 제목] ", styleId: 1 },
{ tag: "[개요 1] ", styleId: 2 },
{ tag: "[개요 2] ", styleId: 3 },
{ tag: "[본문] ", styleId: 10 },
{ tag: "[본문 1 (-)] ", styleId: 11 },
{ tag: "[본문강조 (○)] ", styleId: 12 },
{ tag: "[주의 및 참고문헌] ", styleId: 13 }
];

```
var i;
var targetTag;
var targetStyle;

for (i = 0; i < styleMap.length; i++)
{
    targetTag = styleMap[i].tag;
    targetStyle = styleMap[i].styleId;

    HAction.Run("MoveDocBegin");

    HAction.GetDefault(
        "RepeatFind",
        HParameterSet.HFindReplace.HSet
    );

    HParameterSet.HFindReplace.FindString =
        targetTag;

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

    while (
        HAction.Execute(
            "RepeatFind",
            HParameterSet.HFindReplace.HSet
        )
    )
    {
        HAction.Run("Delete");
        HAction.Run("MoveParaBegin");

        ApplyRealStyle(targetStyle);

        HAction.Run("MoveParaBegin");

        ApplyRealStyle(targetStyle);

        HAction.Run("MoveParaEnd");
    }
}

HAction.Run("MoveDocBegin");
```

}

function ApplyRealStyle(styleId)
{
var action;
var parameterSet;

```
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
```

}
