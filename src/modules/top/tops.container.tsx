import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from "../../reducers";
import { bindActionCreators, Dispatch } from "redux";
import { TopAction } from "../../actions";
import './tops.less';
import { Link } from "react-router-dom";
import { IStyleTop, ITop } from "../../interfaces";
import { actions } from "../../helpers";
import { Card, ImgCard, Layout } from "../../components";

export interface ITopsProps {
    actions?: {
        top: typeof TopAction;
    },
    tops?: ITop[];
    styleTops?: IStyleTop[];
}

@connect(
    (state: IState) => ({
        tops: state.tops,
        styleTops: state.styleTops,
    }),
    (dispatch: Dispatch) => ({
        actions: {
            top: bindActionCreators(actions(TopAction), dispatch),
        }
    })
)
export class Tops extends React.Component<ITopsProps> {
    componentDidMount(): void {
        this.props.actions.top.getTops();
        this.props.actions.top.getStyleTops();
    }

    render() {
        const { tops, styleTops } = this.props;
        return <Layout className="tops">
            {tops.map((top: ITop) => <div className="tops-item" key={top.id}>
                <img src={top.photo} alt={top.name}/>
                <ul>
                    {top.songs.map((song: string, index: number) => <li key={index}>
                        <span className={index < 3 ? 'hot' : ''}>{index + 1}</span>{song}
                    </li>)}
                </ul>
                <Link to={`/tops/${top.id}`}>查看更多 &gt;</Link>
            </div>)}
            <Card title="分区排行榜">
                <ImgCard count={4}>
                    {styleTops.map((top: IStyleTop) =>
                        <ImgCard.Item
                            height={171.5}
                            key={top.style}
                            title={top.style}
                            img={top.picture}
                            onClick={() => location.hash = `#/tops/style/${encodeURIComponent(top.style)}`}
                        />
                    )}
                </ImgCard>
            </Card>
        </Layout>
    }
}
