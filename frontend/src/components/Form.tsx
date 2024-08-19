import { ChangeEvent, useState } from "react";

export interface Url {
url: string,
id: number,
isOptional: boolean
}
interface FormProps {
    onSubmit: (urls: string[]) => void;
  }

export const Form = ({onSubmit}:FormProps) => {

    const [urls, setUrls] = useState<Url[]>([{url: '', id: 0, isOptional: false}, {url: '', id: 1, isOptional: false}, {url: '', id: 2, isOptional: false}])

    const [counter, setCounter] = useState<number>(3);

    function handleSubmit(e: { preventDefault: () => void; target: any; }) {
        e.preventDefault();
        const stringUrls = urls.map(u=> u.url);
        onSubmit(stringUrls);
    };

    function addUrlField() {
        setUrls([...urls, {url: '', id: counter, isOptional: true} ]);
        setCounter(x=>x+1);
    }

    function removeUrlField(url: Url){
        if(url.isOptional){
            const newUrls = urls.filter(u => u !== url)
            setUrls(newUrls);
            setCounter(x=>x-1);
        }

    }

    const handleUrlChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newUrls = [...urls];
        newUrls[index].url = event.target.value;
        setUrls(newUrls);
      };

      return (
        <form method="post" onSubmit={handleSubmit} className="url-form">
          {urls.map((url) => (
            <div key={url.id} className="url-input-group">
              <label>
                URL: 
                <input
                  type="url"
                  value={url.url}
                  onChange={(e) => handleUrlChange(url.id, e)}
                  placeholder="Enter a URL"
                  required
                  className="url-input"
                />
              </label>
              {url.isOptional && (
                <button type="button" onClick={() => { removeUrlField(url); }} className="remove-button">
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addUrlField} className="add-button">+</button>
          <br />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      );
};
