module ApiBase
  extend ActiveSupport::Concern

  private

  def api_proc
    begin
      @status_code = :ok
      @data = yield
    rescue => ex
      @status_code = :internal_server_error
      @data = { message: ex.to_s }
    end

    respond_to do |format|
      format.html { render action: nil, status: @status_code }
      format.json { render json: @data, status: @status_code }
      format.xml  { render xml:  @data, status: @status_code }
    end
  end
end
