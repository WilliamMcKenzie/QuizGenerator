import { useRouter } from "next/navigation"
import { forwardRef, useState } from "react"

export default forwardRef(function AdvancedSettings({ createQuiz } : { createQuiz : any }, ref : any)
{
    const router = useRouter()
    const [error, setError] = useState(false)
    const [quiz_title, setQuizTitle] = useState("")
    const [ai_model, setAIModel] = useState(0)
    const [steps, setSteps] = useState<Array<string>>(["", "", ""])
    
    const ai_models = [
        "Fast (gemma2-9b)",
        "Detailed (lama3-70b)"
    ]

    function generate()
    {
        if (quiz_title.length == 0)
        {
            setError(true)
        }
        else
        {
            ref?.current?.close()
            createQuiz({
                "quiz_title" : quiz_title,
                "ai_model" : ai_model,
                "steps" : steps
            })
        }
    }

    return (
        <dialog ref={ref} id="share_modal" className="modal">
            <div className="modal-box" style={{maxWidth: "fit-content"}}>
                <h1 className="text-2xl font-semibold">Advanced Settings</h1>
                <div className="mt-8">
                    <label className="label">
                        <span className="text-base label-text">Quiz Title*</span>
                    </label>
                    <input
                        className="mt-2 input flex items-center gap-2"
                        value={quiz_title}
                        type="text" 
                        spellCheck="false"
                        list="autocompleteOff" 
                        autoComplete="off"
                        aria-autocomplete="none"
                        onChange={(e) => {
                            setQuizTitle(e.target.value)
                        }}
                        placeholder="ex. Dogs"
                    />
                </div>
                <div className="mt-4 flex flex-col">
                    <label className="label">
                        <span className="text-base label-text">AI Model*</span>
                    </label>
                    <details className="dropdown">
                        <summary className="btn m-1">{ai_models[ai_model]}</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {
                                ai_models.map((model, index) => (
                                    <li><a onClick={() => setAIModel(index)}>{model}</a></li>
                                ))
                            }
                        </ul>
                    </details>
                </div>
                <h1 className="text-xl font-semibold mt-8 mb-8">Quiz Sections</h1>
                <table className="table">
                    <tbody>
                        {steps.map((_step, index) => {
                            return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td className="flex">
                                    <input placeholder="Auto" value={_step} className="input input-ghost" onChange={(e) => {
                                        let temp : Array<string> = [...steps]
                                        temp[index] = e.target.value
                                        setSteps(temp)
                                }}/>
                                {
                                    index + 1 == steps.length && index < 4 ?
                                    <button className="btn btn-square btn-ghost ml-auto" onClick={() => { setSteps([...steps, ""]) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                    </button>
                                    :
                                    <button className="btn btn-square btn-ghost ml-auto" onClick={() => {
                                        var tempSteps = [...steps]
                                        tempSteps.splice(index, 1)
                                        setSteps(tempSteps)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                    </button>
                                }
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-primary">
                            Cancel
                        </button>
                    </form>
                    <button onClick={() => generate()} className="btn btn-secondary ml-2">
                        Generate
                    </button>
                </div>
            </div>
        </dialog>
    )
})