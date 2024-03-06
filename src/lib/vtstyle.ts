import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import RenderFeature from 'ol/render/Feature'

export default function vtStyle(feature: RenderFeature, resolution: number) {
	// RenderFeature から properties を取得
	const properties = feature.getProperties()
	// properties に格納されているレイヤ名からスタイルを書き分ける
	if (properties.layer === 'road') {
		return new Style({
			stroke: new Stroke({
				color: '#eee',
				width: 2
			}),
			zIndex: 1
		})
	} else if (properties.layer === 'railway') {
		return new Style({
			stroke: new Stroke({
				color: '#ddd'
			}),
			zIndex: 2
		})
	} else if (properties.layer === 'coastline') {
		return new Style({
			stroke: new Stroke({
				color: 'skyblue',
				width: 2
			}),
			zIndex: 0
		})
	} else if (
		properties.layer === 'lake' ||
		properties.layer === 'waterarea'
	) {
		return new Style({
			fill: new Fill({
				color: 'skyblue'
			}),
			zIndex: 0
		})
	} else {
		// 空の new Style() を返すと何も描写しない
		return new Style()
	}
}
