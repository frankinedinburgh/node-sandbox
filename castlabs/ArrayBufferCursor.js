var ArrayBufferCursor = function (){
	var ArrayBufferCursor = function (arrayBuffer){
		this.dataview = new DataView(arrayBuffer, 0);
		this.size = arrayBuffer.byteLength;
		this.index = 0;
	}

	ArrayBufferCursor.prototype.next = function (type){
		switch (type) {
			case 'Uint8':
				var result = this.dataview.getUint8(this.index);
				this.index += 1;
				return result;
			case 'Int16':
				var result = this.dataview.getInt16(this.index, true);
				this.index += 2;
				return result;
			case 'Uint16':
				var result = this.dataview.getUint16(this.index, true);
				this.index += 2;
				return result;
			case 'Int32':
				var result = this.dataview.getInt32(this.index, true);
				this.index += 4;
				return result;
			case 'Uint32':
				var result = this.dataview.getUint32(this.index, true);
				this.index += 4;
				return result;
			case 'Float':
			case 'Float32':
				var result = this.dataview.getFloat32(this.index, true);
				this.index += 4;
				return result;
			case 'Double':
			case 'Float64':
				var result = this.dataview.getFloat64(this.index, true);
				this.index += 8;
				return result;
			default:
				throw new Error("Unknown datatype");
		}
	};

	ArrayBufferCursor.prototype.hasNext = function (){
		return this.index < this.size;
	}

	return ArrayBufferCursor;
};
